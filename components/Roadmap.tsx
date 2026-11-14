import { Arrow } from "./Icons";
import {
  board,
  columns,
  cuts,
  formatDate,
  type RoadmapCard,
} from "@/lib/roadmap";

// The LuxEngine project board, rendered from the snapshot in lib/roadmap.json.
// Work moves left to right as it lands, the same way it does on the board.

type ColumnState = "planned" | "next" | "active" | "done";

const SHIPPED_SHOWN = 6;

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

function Card({ card, state }: { card: RoadmapCard; state: ColumnState }) {
  const body = (
    <>
      <StateIcon state={state} />
      <div>
        <p className="board-card-title">{card.title}</p>
        {card.detail ? <p className="board-card-detail">{card.detail}</p> : null}
        {card.progress ? <Progress {...card.progress} /> : null}
        <ul className="board-labels" role="list" aria-label="Details">
          {card.tag ? <li className="tag">{card.tag}</li> : null}
          {card.size ? <li>Size {card.size}</li> : null}
          {card.date ? <li>{formatDate(card.date)}</li> : null}
        </ul>
      </div>
    </>
  );
  return (
    <li>
      {card.url ? (
        <a href={card.url} className="board-card">
          {body}
        </a>
      ) : (
        <div className="board-card">{body}</div>
      )}
    </li>
  );
}

function CompactRow({ card }: { card: RoadmapCard }) {
  return (
    <li>
      <a href={card.url ?? board.url} className="board-row">
        <StateIcon state="planned" />
        <span className="board-row-tag">{card.tag}</span>
        <span>{card.title}</span>
      </a>
    </li>
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
  footer?: React.ReactNode;
};

function Column({
  id,
  name,
  state,
  theme,
  text,
  count,
  children,
  footer,
}: ColumnProps) {
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
        {footer}
      </div>
    </section>
  );
}

export function Roadmap() {
  const shipped = columns.shipped.slice(0, SHIPPED_SHOWN);
  const moreShipped = columns.shipped.length - shipped.length;
  return (
    <>
      <div
        className="board"
        role="region"
        aria-label="LuxEngine project board"
        tabIndex={0}
      >
        <Column
          id="wanted"
          name="Wanted"
          state="planned"
          theme="If time allows in 2027.1"
          text="Wanted for the release, and the first things dropped if the must-haves run late."
          count={columns.wanted.length}
        >
          <ul className="board-rows" role="list">
            {columns.wanted.map((card) => (
              <CompactRow key={card.key} card={card} />
            ))}
          </ul>
        </Column>

        <Column
          id="must"
          name="Must-haves"
          state="next"
          theme="Not started yet"
          text="2027.1 does not ship without these. Each one is split into sub-issues on GitHub."
          count={columns.mustTodo.length}
        >
          <ul className="board-cards" role="list">
            {columns.mustTodo.map((card) => (
              <Card key={card.key} card={card} state="next" />
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
            {columns.inProgress.map((card) => (
              <Card key={card.key} card={card} state="active" />
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
          footer={
            moreShipped > 0 ? (
              <a href={board.url} className="board-more">
                {moreShipped} older items on the board <Arrow diagonal />
              </a>
            ) : null
          }
        >
          <ul className="board-cards" role="list">
            {shipped.map((card) => (
              <Card key={card.key} card={card} state="done" />
            ))}
          </ul>
        </Column>
      </div>
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
          .
        </p>
      ) : null}
    </>
  );
}
