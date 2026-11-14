import snapshot from "./roadmap.json";

/**
 * The /lux roadmap, read from a snapshot of the LuxEngine project board
 * (github.com/orgs/starbounded-dev/projects/3). Refresh the snapshot with
 * `npm run roadmap:sync`; nothing here should be edited by hand.
 */

export type BoardStatus = "Todo" | "In Progress" | "Done";

export type BoardItem = {
  kind: "issue" | "pr" | "draft";
  number: number | null;
  title: string;
  url: string | null;
  status: BoardStatus;
  priority: string | null;
  size: string | null;
  milestone: string | null;
  parent: number | null;
  subIssues: { total: number; done: number } | null;
  closedAt: string | null;
};

export type RoadmapCard = {
  key: string;
  /** Catalog ID such as "M2" or "R9", or "PR 36". */
  tag: string | null;
  title: string;
  detail: string | null;
  url: string | null;
  size: string | null;
  progress: { total: number; done: number } | null;
  date: string | null;
};

export const RELEASE = "2027.1";

/**
 * Rows the catalog marks for removal before 2027.1 (catalog section 7). They
 * are P1 on the board like the wanted items, so they are told apart here.
 */
const CUT_LABELS: Record<string, string> = {
  R15: "the empty PathTracing and Meshlets shader folders",
  R16: "the NRD denoiser (temporal by design)",
  S6: "the unused simulation-thread scaffolding",
  G9: "Discord integration in release builds",
};
const CUT_IDS = new Set(Object.keys(CUT_LABELS));

const items = snapshot.items as BoardItem[];

export const board = snapshot.board;
export const syncedAt = snapshot.syncedAt;

const mustPattern = new RegExp(`^${RELEASE.replace(".", "\\.")} (M\\d+): (.+)$`);
const rowPattern = /^([A-Z]+\d+[a-z]?): (.+)$/;

function splitTitle(rest: string) {
  // "C# API completion: physics queries, ..." -> title + detail.
  const at = rest.indexOf(": ");
  if (at === -1) return { title: rest, detail: null };
  return { title: rest.slice(0, at), detail: rest.slice(at + 2) };
}

function clean(title: string) {
  return title
    .replace(/^(features?|feat|WIP):\s*/i, "")
    .replace(/^./, (c) => c.toUpperCase());
}

function toCard(item: BoardItem): RoadmapCard {
  const key = `${item.kind}-${item.number ?? item.title}`;
  const must = item.title.match(mustPattern);
  if (must) {
    const { title, detail } = splitTitle(must[2]);
    return {
      key,
      tag: must[1],
      title,
      detail,
      url: item.url,
      size: item.size,
      progress: item.subIssues,
      date: null,
    };
  }
  const row = item.title.match(rowPattern);
  if (row) {
    const { title, detail } = splitTitle(
      row[2]
        .replace(/`/g, "")
        .replace(/\s*\((backlog|§)[^)]*\)/g, "")
        .replace(/\s*\((?:[A-Z]+\d+[a-z]?(?:,\s*)?)+\)/g, ""),
    );
    return {
      key,
      tag: row[1],
      title,
      detail,
      url: item.url,
      size: item.size,
      progress: item.subIssues,
      date: null,
    };
  }
  return {
    key,
    tag: item.kind === "pr" && item.number ? `PR ${item.number}` : null,
    title: clean(item.title),
    detail: null,
    url: item.url,
    size: item.size,
    progress: item.subIssues,
    date: item.closedAt,
  };
}

const mustNumber = (c: RoadmapCard) => Number(c.tag?.slice(1) ?? 0);
const inRelease = (i: BoardItem) => i.milestone === RELEASE;
const tagOf = (i: BoardItem) => i.title.match(rowPattern)?.[1] ?? "";

export const mustHaves = items
  .filter((i) => mustPattern.test(i.title))
  .map(toCard)
  .sort((a, b) => mustNumber(a) - mustNumber(b));

const isMust = (i: BoardItem) => mustPattern.test(i.title);

export const columns = {
  wanted: items
    .filter(
      (i) =>
        inRelease(i) &&
        i.status === "Todo" &&
        i.priority === "P1" &&
        !CUT_IDS.has(tagOf(i)),
    )
    .map(toCard),
  mustTodo: items.filter((i) => isMust(i) && i.status === "Todo").map(toCard)
    .sort((a, b) => mustNumber(a) - mustNumber(b)),
  inProgress: items
    .filter((i) => i.status === "In Progress")
    .map(toCard)
    .sort((a, b) => (a.tag?.startsWith("M") ? -1 : 0) - (b.tag?.startsWith("M") ? -1 : 0)),
  shipped: items
    .filter((i) => i.status === "Done")
    .map(toCard)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "")),
};

export const cuts = items
  .filter((i) => inRelease(i) && CUT_IDS.has(tagOf(i)))
  .map((i) => ({ ...toCard(i), title: CUT_LABELS[tagOf(i)] }));

export const releaseCounts = {
  issues: items.filter(inRelease).length,
  mustHaves: mustHaves.length,
  wanted: columns.wanted.length,
  cuts: cuts.length,
  done: items.filter((i) => inRelease(i) && i.status === "Done").length,
};

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
