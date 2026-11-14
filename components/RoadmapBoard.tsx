"use client";

import { useId, useRef, useState } from "react";

type Props = {
  /** Every card the board can show; the collapsed board hides the extras. */
  children: React.ReactNode;
  /** Items shown when expanded, for the button label. */
  total: number;
  /** Items shown when collapsed. */
  shown: number;
};

// Holds the expand state for the server-rendered roadmap. Collapsed, the
// board shows a few cards per column; expanded, it shows every item and each
// must-have's sub-issues. Cards past the limit carry data-extra and are
// hidden by CSS while collapsed, so nothing is fetched or re-rendered.
export function RoadmapBoard({ children, total, shown }: Props) {
  const [expanded, setExpanded] = useState(false);
  const boardId = useId();
  const boardRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const next = !expanded;
    setExpanded(next);
    // Collapsing can leave the reader far below the board; bring its top
    // back into view so the button press has a visible result.
    if (!next) {
      const top = boardRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 0) boardRef.current?.scrollIntoView({ block: "start" });
    }
  };

  return (
    <>
      <div
        ref={boardRef}
        id={boardId}
        className="board"
        role="region"
        aria-label="LuxEngine project board"
        tabIndex={0}
        data-expanded={expanded}
      >
        {children}
      </div>
      <div className="board-toggle-row">
        <button
          type="button"
          className="board-toggle"
          aria-expanded={expanded}
          aria-controls={boardId}
          onClick={toggle}
        >
          {expanded
            ? "Show less"
            : `Show the whole board: ${total} items and sub-issues`}
        </button>
        <span className="board-toggle-note">
          {expanded
            ? `Showing all ${total}.`
            : `Showing ${shown} of ${total}.`}
        </span>
      </div>
    </>
  );
}
