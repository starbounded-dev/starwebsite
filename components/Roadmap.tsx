import { Arrow } from "./Icons";
import { RoadmapBoard } from "./RoadmapBoard";
import {
  COLLAPSED_PER_COLUMN,
  board,
  columns,
  cuts,
  formatDate,
  subIssuesOf,
  type BoardStatus,
  type RoadmapCard,
} from "@/lib/roadmap";

// The LuxEngine project board, rendered from the snapshot in lib/roadmap.json.
// Work moves left to right as it lands, the same way it does on the board.
// Collapsed, each column shows COLLAPSED_PER_COLUMN cards; expanded, the board
// shows every item and each must-have's sub-issues.

type ColumnState = "planned" | "next" | "active" | "done";

const stateOf: Record<BoardStatus, ColumnState> = {
  Todo: "next",
  "In Progress": "active",
  Done: "done",
};

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

function Progress({ total, done }: { total: number; done: number }) {
  return (
    <div className="board-progress">
      <span className="board-progress-track" aria-hidden="true">
        <span style={{ width: `${(done / total) * 100}%` }} />
      </span>
      <span>
        {done} of {total} sub-issues done
      </span>
    </div>
  );
}

/** A must-have's sub-issues, shown only on the expanded board. */
function SubIssues({ cards }: { cards: RoadmapCard[] }) {
  if (cards.length === 0) return null;
  return (
    <ul className="board-subissues" role="list" aria-label="Sub-issues" data-extra>
      {cards.map((card) => (
        <li key={card.key} data-status={stateOf[card.status]}>
          <StateIcon state={stateOf[card.status]} />
          <a href={card.url ?? board.url}>
            <span className="board-row-tag">{card.tag}</span> {card.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Card({
  card,
  state,
  extra,
}: {
  card: RoadmapCard;
  state: ColumnState;
  extra: boolean;
}) {
  const subs = card.progress ? subIssuesOf(card.number) : [];
  return (
    <li data-extra={extra || undefined}>
      <div className="board-card">
        <StateIcon state={state} />
        <div>
          <p className="board-card-title">
            {card.url ? (
              <a href={card.url} className="board-card-link">
                {card.title}
              </a>
            ) : (
              card.title
            )}
          </p>
          {card.detail ? (
            <p className="board-card-detail">{card.detail}</p>
          ) : null}
          {card.progress ? <Progress {...card.progress} /> : null}
          <ul className="board-labels" role="list" aria-label="Details">
            {card.tag ? <li className="tag">{card.tag}</li> : null}
            {card.size ? <li>Size {card.size}</li> : null}
            {card.date ? <li>{formatDate(card.date)}</li> : null}
          </ul>
          <SubIssues cards={subs} />
        </div>
      </div>
    </li>
  );
}

function CompactRow({ card, extra }: { card: RoadmapCard; extra: boolean }) {
  return (
    <li data-extra={extra || undefined}>
      <a href={card.url ?? board.url} className="board-row">
        <StateIcon state="planned" />
        <span className="board-row-tag">{card.tag}</span>
        <span>{card.title}</span>
      </a>
    </li>
  );
}

function MoreHint({ hidden }: { hidden: number }) {
  if (hidden <= 0) return null;
  return (
    <p className="board-more-hint" aria-hidden="true">
      +{hidden} more
    </p>
  );
}

type ColumnProps = {
  id: string;
  name: string;
  state: ColumnState;
  theme: string;
  text: string;
  count: number;
  children: React.ReactNode;
};

function Column({ id, name, state, theme, text, count, children }: ColumnProps) {
  const headingId = `board-${id}`;
  return (
    <section
      className="board-column"
      data-state={state}
      data-column={id}
      aria-labelledby={headingId}
    >
      <header className="board-column-head">
        <h3 id={headingId}>
          <StateIcon state={state} />
          <span>{name}</span>
          <span className="board-count" aria-label={`${count} items`}>
            {count}
          </span>
        </h3>
        <p className="board-theme">{theme}</p>
        <p className="board-text">{text}</p>
      </header>
      <div className="board-column-body">
        {children}
        <MoreHint hidden={count - COLLAPSED_PER_COLUMN} />
      </div>
    </section>
  );
}

const isExtra = (index: number) => index >= COLLAPSED_PER_COLUMN;

export function Roadmap() {
  const lists = [
    columns.wanted,
    columns.mustTodo,
    columns.inProgress,
    columns.shipped,
  ];
  const subCount = [...columns.mustTodo, ...columns.inProgress].reduce(
    (sum, card) => sum + (card.progress ? subIssuesOf(card.number).length : 0),
    0,
  );
  const total = lists.reduce((sum, list) => sum + list.length, 0) + subCount;
  const shown = lists.reduce(
    (sum, list) => sum + Math.min(list.length, COLLAPSED_PER_COLUMN),
    0,
  );

  return (
    <>
      <RoadmapBoard total={total} shown={shown}>
        <Column
          id="wanted"
          name="Wanted"
          state="planned"
          theme="If time allows in 2027.1"
          text="Wanted for the release, and the first things dropped if the must-haves run late."
          count={columns.wanted.length}
        >
          <ul className="board-rows" role="list">
            {columns.wanted.map((card, index) => (
              <CompactRow key={card.key} card={card} extra={isExtra(index)} />
            ))}
          </ul>
        </Column>

        <Column
          id="must"
          name="Must-haves"
          state="next"
          theme="Not started yet"
          text="2027.1 does not ship without these. Expand the board to see each one's sub-issues."
          count={columns.mustTodo.length}
        >
          <ul className="board-cards" role="list">
            {columns.mustTodo.map((card, index) => (
              <Card
                key={card.key}
                card={card}
                state="next"
                extra={isExtra(index)}
              />
            ))}
          </ul>
        </Column>

        <Column
          id="progress"
          name="In progress"
          state="active"
          theme="Being worked on now"
          text="Someone is working on these right now. Each card links to where it stands."
          count={columns.inProgress.length}
        >
          <ul className="board-cards" role="list">
            {columns.inProgress.map((card, index) => (
              <Card
                key={card.key}
                card={card}
                state="active"
                extra={isExtra(index)}
              />
            ))}
          </ul>
        </Column>

        <Column
          id="shipped"
          name="Shipped"
          state="done"
          theme="Merged, newest first"
          text="Pull requests and finished items from the board."
          count={columns.shipped.length}
        >
          <ul className="board-cards" role="list">
            {columns.shipped.map((card, index) => (
              <Card
                key={card.key}
                card={card}
                state="done"
                extra={isExtra(index)}
              />
            ))}
          </ul>
        </Column>
      </RoadmapBoard>
      {cuts.length > 0 ? (
        <p className="board-cuts">
          Also on the board: {cuts.length} things to remove or hide before
          2027.1:{" "}
          {cuts.map((card, index) => (
            <span key={card.key}>
              {index > 0 ? (index === cuts.length - 1 ? ", and " : ", ") : null}
              <a href={card.url ?? board.url}>{card.title}</a>
            </span>
          ))}
          . <a href={board.url}>Open the full board on GitHub</a>{" "}
          <Arrow diagonal />
        </p>
      ) : null}
    </>
  );
}
