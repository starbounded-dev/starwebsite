// A project board in the style of a GitHub Projects board view: work moves
// left to right as it lands. The three planned columns mirror "Active
// development" and "Next up" in the LuxEngine README; the last column is
// summarized from "What works today" in the same README.

type ColumnState = "planned" | "next" | "active" | "done";

type Card = {
  title: string;
  labels: readonly string[];
};

type Column = {
  id: string;
  name: string;
  state: ColumnState;
  theme: string;
  text: string;
  cards: readonly Card[];
};

const columns: readonly Column[] = [
  {
    id: "later",
    name: "Further out",
    state: "planned",
    theme: "Streaming and effects",
    text: "Work that makes larger scenes practical, and the effects an engine is expected to have.",
    cards: [
      { title: "Asset streaming and hardened async uploads", labels: ["Assets"] },
      { title: "A particle system", labels: ["Effects"] },
    ],
  },
  {
    id: "next",
    name: "Up next",
    state: "next",
    theme: "Animation and terrain",
    text: "The shader side of animated meshes exists. The importer and playback come next, then the terrain system that is still on a branch.",
    cards: [
      { title: "Skeletal animation, from import to playback", labels: ["Animation"] },
      { title: "Merging the procedural terrain system", labels: ["Terrain"] },
      { title: "A broader C# scripting API for physics and rendering", labels: ["Scripting"] },
    ],
  },
  {
    id: "now",
    name: "In progress",
    state: "active",
    theme: "Performance, measured",
    text: "A profiling-led pass over the renderer. Baseline first, then remove the waste the numbers point to.",
    cards: [
      { title: "Render-graph compile caching", labels: ["Renderer"] },
      { title: "Fewer per-frame allocations on the submission path", labels: ["Renderer"] },
      { title: "Link-time-optimized distribution builds", labels: ["Build"] },
    ],
  },
  {
    id: "done",
    name: "Works today",
    state: "done",
    theme: "In the engine now",
    text: "The systems you get when you build from source. The list above has the detail.",
    cards: [
      { title: "Deferred PBR renderer with a render graph", labels: ["Renderer"] },
      { title: "Docking editor with undo, gizmos, and a profiler", labels: ["Editor"] },
      { title: "ECS scenes, prefabs, and Play in the editor", labels: ["Scenes"] },
      { title: "3D physics on Jolt, 2D physics on Box2D", labels: ["Physics"] },
      { title: "C# scripts with hot reload", labels: ["Scripting", "Partial"] },
      { title: "Asset packs and a standalone runtime", labels: ["Assets"] },
    ],
  },
];

function StateIcon({ state }: { state: ColumnState }) {
  if (state === "done") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true" className="board-icon">
        <circle cx="8" cy="8" r="6.5" fill="currentColor" />
        <path
          d="M5.2 8.2 7.1 10l3.7-4"
          fill="none"
          stroke="var(--paper)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="board-icon">
      <circle
        cx="8"
        cy="8"
        r="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray={state === "planned" ? "2.4 2.3" : undefined}
      />
      {state === "active" ? (
        <path d="M8 4a4 4 0 0 1 0 8z" fill="currentColor" />
      ) : null}
    </svg>
  );
}

export function Roadmap() {
  return (
    <div
      className="board"
      role="region"
      aria-label="LuxEngine project board"
      tabIndex={0}
    >
      {columns.map((column) => {
        const headingId = `board-${column.id}`;
        return (
          <section
            key={column.id}
            className="board-column"
            data-state={column.state}
            aria-labelledby={headingId}
          >
            <header className="board-column-head">
              <h3 id={headingId}>
                <StateIcon state={column.state} />
                <span>{column.name}</span>
                <span
                  className="board-count"
                  aria-label={`${column.cards.length} items`}
                >
                  {column.cards.length}
                </span>
              </h3>
              <p className="board-theme">{column.theme}</p>
              <p className="board-text">{column.text}</p>
            </header>
            <ul className="board-cards" role="list">
              {column.cards.map((card) => (
                <li key={card.title} className="board-card">
                  <StateIcon state={column.state} />
                  <div>
                    <p>{card.title}</p>
                    <ul className="board-labels" role="list" aria-label="Labels">
                      {card.labels.map((label) => (
                        <li
                          key={label}
                          className={label === "Partial" ? "partial" : undefined}
                        >
                          {label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
