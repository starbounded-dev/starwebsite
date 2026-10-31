import { JSDOM } from "jsdom";

const dom = new JSDOM(
  "<!doctype html><html data-theme='light'><body></body></html>",
  {
    url: "http://localhost:3000",
    pretendToBeVisual: true,
  },
);

for (const key of [
  "window",
  "document",
  "navigator",
  "HTMLElement",
  "HTMLButtonElement",
  "HTMLInputElement",
  "HTMLSelectElement",
  "HTMLTextAreaElement",
  "SVGElement",
  "Element",
  "Node",
  "NodeFilter",
  "DocumentFragment",
  "MutationObserver",
  "Event",
  "CustomEvent",
  "MouseEvent",
  "KeyboardEvent",
  "FocusEvent",
  "StorageEvent",
  "getComputedStyle",
  "localStorage",
  "sessionStorage",
] as const) {
  Object.defineProperty(globalThis, key, {
    configurable: true,
    value: dom.window[key],
  });
}
Object.assign(globalThis, {
  self: dom.window,
  requestAnimationFrame: dom.window.requestAnimationFrame.bind(dom.window),
  cancelAnimationFrame: dom.window.cancelAnimationFrame.bind(dom.window),
  IS_REACT_ACT_ENVIRONMENT: true,
});

let viewportWidth = 1280;
const media = new Map<
  string,
  { list: MediaQueryList; listeners: Set<(event: MediaQueryListEvent) => void> }
>();
function matches(query: string) {
  const minimum = /min-width:\s*(\d+)px/.exec(query);
  const maximum = /max-width:\s*(\d+)px/.exec(query);
  return minimum
    ? viewportWidth >= Number(minimum[1])
    : maximum
      ? viewportWidth <= Number(maximum[1])
      : query.includes("prefers-reduced-motion");
}
dom.window.matchMedia = (query) => {
  if (!media.has(query)) {
    const listeners = new Set<(event: MediaQueryListEvent) => void>();
    const list = {
      get matches() {
        return matches(query);
      },
      media: query,
      onchange: null,
      addEventListener: (
        _: string,
        listener: (event: MediaQueryListEvent) => void,
      ) => listeners.add(listener),
      removeEventListener: (
        _: string,
        listener: (event: MediaQueryListEvent) => void,
      ) => listeners.delete(listener),
      addListener: (listener: (event: MediaQueryListEvent) => void) =>
        listeners.add(listener),
      removeListener: (listener: (event: MediaQueryListEvent) => void) =>
        listeners.delete(listener),
      dispatchEvent: () => true,
    } as MediaQueryList;
    media.set(query, { list, listeners });
  }
  return media.get(query)!.list;
};

export function setTestWidth(width: number) {
  viewportWidth = width;
  for (const { list, listeners } of media.values()) {
    for (const listener of listeners)
      listener({
        matches: list.matches,
        media: list.media,
      } as MediaQueryListEvent);
  }
}

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.assign(globalThis, { ResizeObserver: ResizeObserverStub });
