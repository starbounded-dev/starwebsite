import "./setup";
import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  act,
  cleanup,
  render,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SetupGuide } from "../components/SetupGuide";
import { ScenePreview } from "../components/ScenePreview";
import { Roadmap } from "../components/Roadmap";
import * as roadmap from "../lib/roadmap";
import { MobileNav } from "../components/MobileNav";
import { ThemeToggle } from "../components/ThemeToggle";
import { InteractionProvider } from "../components/InteractionProvider";
import { navigationLinks } from "../lib/navigation";
import { setTestWidth } from "./setup";

afterEach(() => {
  cleanup();
  act(() => setTestWidth(1280));
  document.documentElement.dataset.theme = "light";
  localStorage.clear();
});

test("setup tabs support arrows, Home/End, matching panels, and unique IDs across instances", async () => {
  const user = userEvent.setup();
  render(
    <InteractionProvider>
      <SetupGuide />
      <SetupGuide />
    </InteractionProvider>,
  );
  const lists = screen.getAllByRole("tablist", { name: "Installation steps" });
  const first = within(lists[0]);
  await user.click(first.getByRole("tab", { name: /Clone the source/ }));
  await user.keyboard("{ArrowRight}");
  assert.equal(document.activeElement?.getAttribute("aria-selected"), "true");
  assert.match(
    document.activeElement?.textContent ?? "",
    /Fetch Asterwave/,
  );
  const panelId = document.activeElement?.getAttribute("aria-controls");
  assert.match(
    document.getElementById(panelId!)?.textContent ?? "",
    /FetchAsterwave\.py/,
  );
  await user.keyboard("{End}");
  assert.match(document.activeElement?.textContent ?? "", /Generate and build/);
  await user.keyboard("{Home}");
  assert.match(document.activeElement?.textContent ?? "", /Clone the source/);
  const ids = [...document.querySelectorAll("[id]")].map(
    (element) => element.id,
  );
  assert.equal(new Set(ids).size, ids.length);
  assert.match(
    within(lists[1]).getByRole("tab", { selected: true }).textContent ?? "",
    /Clone/,
  );
});

test("copy feedback belongs to the selected command, including rejected clipboard access", async () => {
  const user = userEvent.setup();
  let copied = "";
  Object.defineProperty(navigator.clipboard, "writeText", {
    configurable: true,
    value: async (text: string) => {
      copied = text;
    },
  });
  render(
    <InteractionProvider>
      <SetupGuide />
    </InteractionProvider>,
  );
  await user.click(screen.getByRole("button", { name: "Copy command" }));
  assert.match(copied, /^git clone --branch dev/);
  assert.equal(screen.getByRole("status").textContent, "Copied to clipboard");
  assert.ok(screen.getByRole("button", { name: "Command copied" }));
  await user.click(screen.getByRole("tab", { name: /Fetch Asterwave/ }));
  assert.match(screen.getByRole("status").textContent ?? "", /Step 2 of 3/);
  Object.defineProperty(navigator.clipboard, "writeText", {
    configurable: true,
    value: async () => {
      throw new Error("denied");
    },
  });
  await user.click(screen.getByRole("button", { name: "Copy command" }));
  assert.match(
    screen.getByRole("status").textContent ?? "",
    /Command selected/,
  );
  assert.equal(
    window.getSelection()?.toString(),
    "python scripts/FetchAsterwave.py",
  );
});

test("late clipboard completion cannot overwrite another step's feedback", async () => {
  const user = userEvent.setup();
  let finishCopy!: () => void;
  Object.defineProperty(navigator.clipboard, "writeText", {
    configurable: true,
    value: () =>
      new Promise<void>((resolve) => {
        finishCopy = resolve;
      }),
  });
  render(
    <InteractionProvider>
      <SetupGuide />
    </InteractionProvider>,
  );
  await user.click(screen.getByRole("button", { name: "Copy command" }));
  await user.click(screen.getByRole("tab", { name: /Generate and build/ }));
  await act(async () => finishCopy());
  assert.match(screen.getByRole("status").textContent ?? "", /Step 3 of 3/);
});

test("gallery keys follow orientation; the viewer traps focus, browses, closes, and returns focus", async () => {
  const user = userEvent.setup();
  render(
    <InteractionProvider>
      <ScenePreview />
    </InteractionProvider>,
  );
  const list = screen.getByRole("tablist", { name: "LuxEngine screenshots" });
  assert.equal(list.getAttribute("aria-orientation"), "vertical");
  await user.click(within(list).getByRole("tab", { name: /Scenes & editor/ }));
  await user.keyboard("{ArrowDown}");
  assert.match(
    document.activeElement?.textContent ?? "",
    /Lighting & rendering/,
  );
  act(() => setTestWidth(360));
  assert.equal(list.getAttribute("aria-orientation"), "horizontal");
  await user.keyboard("{ArrowRight}");
  assert.match(document.activeElement?.textContent ?? "", /Material editor/);
  const opener = screen.getByRole("button", {
    name: "Enlarge Material editor screenshot",
  });
  await user.click(opener);
  const dialog = await screen.findByRole("dialog", {
    name: /LuxEngine screenshot viewer/,
  });
  assert.equal(dialog.getAttribute("aria-modal"), "true");
  await waitFor(() =>
    assert.equal(
      document.activeElement,
      within(dialog).getByRole("button", { name: "Close screenshot viewer" }),
    ),
  );
  await user.keyboard("{Shift>}{Tab}{/Shift}");
  assert.equal(
    document.activeElement,
    within(dialog).getByRole("button", { name: "Next screenshot" }),
  );
  await user.keyboard("{Tab}");
  assert.equal(
    document.activeElement,
    within(dialog).getByRole("button", { name: "Close screenshot viewer" }),
  );
  await user.keyboard("{ArrowRight}");
  assert.ok(within(dialog).getByRole("img", { name: /Sponza courtyard vaults/ }));
  await user.keyboard("{Escape}");
  await waitFor(() => assert.equal(screen.queryByRole("dialog"), null));
  assert.equal(document.activeElement, opener);
  const imageOpener = screen.getByRole("button", {
    name: "Open Sponza in play screenshot in full size",
  });
  await user.click(imageOpener);
  await user.keyboard("{ArrowRight}{Escape}");
  await waitFor(() => assert.equal(screen.queryByRole("dialog"), null));
  assert.equal(document.activeElement, opener);
});

test("roadmap board renders the synced project board with links and counts", () => {
  render(<Roadmap />);
  const board = screen.getByRole("region", { name: "LuxEngine project board" });
  assert.equal(board.getAttribute("tabindex"), "0");
  const columns = within(board).getAllByRole("region");
  assert.deepEqual(
    columns.map((column) =>
      within(column).getByRole("heading").textContent?.replace(/\d+$/, ""),
    ),
    ["Wanted", "Must-haves", "In progress", "Shipped"],
  );
  const [wanted, must, progress] = columns;
  assert.ok(
    within(wanted).getByLabelText(`${roadmap.columns.wanted.length} items`),
  );
  assert.equal(
    within(must).getAllByRole("link").length,
    roadmap.columns.mustTodo.length,
  );
  assert.ok(within(must).getAllByText(/of \d+ sub-issues done/).length > 0);
  for (const link of within(progress).getAllByRole("link")) {
    assert.match(link.getAttribute("href") ?? "", /^https:\/\/github\.com\//);
  }
});

test("mobile navigation dismisses with Escape, outside click, and desktop breakpoint", async () => {
  const user = userEvent.setup();
  act(() => setTestWidth(360));
  render(
    <MobileNav
      links={navigationLinks}
      sourceUrl="https://github.com/starbounded-dev"
      engine
    />,
  );
  const trigger = screen.getByRole("button", { name: "Open navigation" });
  await user.click(trigger);
  assert.ok(screen.getByRole("navigation", { name: "Mobile navigation" }));
  await waitFor(() =>
    assert.equal(document.activeElement?.textContent, "Products"),
  );
  await user.keyboard("{Escape}");
  await waitFor(() =>
    assert.equal(trigger.getAttribute("aria-expanded"), "false"),
  );
  assert.equal(document.activeElement, trigger);
  await user.click(trigger);
  await user.click(document.body);
  await waitFor(() =>
    assert.equal(trigger.getAttribute("aria-expanded"), "false"),
  );
  await user.click(trigger);
  act(() => setTestWidth(1280));
  await waitFor(() =>
    assert.equal(trigger.getAttribute("aria-expanded"), "false"),
  );
});

test("theme exposes pressed state, persists changes, and follows cross-tab changes", async () => {
  const user = userEvent.setup();
  render(<ThemeToggle />);
  const button = screen.getByRole("button", { name: "Dark theme" });
  assert.equal(button.getAttribute("aria-pressed"), "false");
  await user.click(button);
  assert.equal(document.documentElement.dataset.theme, "dark");
  assert.equal(localStorage.getItem("starbounded-theme"), "dark");
  assert.equal(button.getAttribute("aria-pressed"), "true");
  act(() =>
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "starbounded-theme",
        newValue: "light",
      }),
    ),
  );
  assert.equal(document.documentElement.dataset.theme, "light");
  assert.equal(button.getAttribute("aria-pressed"), "false");
});
