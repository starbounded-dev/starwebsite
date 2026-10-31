import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const milestones = [
  {
    number: "01",
    phase: "THE FOUNDATION",
    title: "Rendering & architecture",
    text: "We’re building on the C++ core and working renderer, improving the foundations as we test more scenes.",
    items: [
      "Rendering core and graphics abstraction",
      "Project and asset organization",
      "Windows development workflow",
    ],
    status: "Current focus",
  },
  {
    number: "02",
    phase: "THE WORKFLOW",
    title: "Tools for creating",
    text: "The editor has a scene hierarchy, content browser, and material controls. We’re making it easier to work with those tools as a whole.",
    items: [
      "Scene hierarchy and asset browsing",
      "Material editing and renderer settings",
      "Scripting workflows (planned)",
    ],
    status: "In development",
  },
  {
    number: "03",
    phase: "THE HORIZON",
    title: "More to explore",
    text: "Further down the line, we’d like to add physics, terrain, audio, and support for more platforms. There’s a lot to learn first.",
    items: [
      "Physics and procedural terrain",
      "Integrated AI and audio systems",
      "More platforms and native graphics APIs",
    ],
    status: "Long-term vision",
  },
];
export function Roadmap() {
  return (
    <Accordion type="multiple" className="roadmap-grid" aria-label="Work ahead">
      {milestones.map((item, index) => (
        <AccordionItem value={item.number} key={item.number} asChild>
          <article>
            <div className="roadmap-stage">
              <span className="roadmap-step mono">{item.number}</span>
              <span
                className={`roadmap-status mono ${index === 0 ? "current" : ""}`}
              >
                {index === 0 ? (
                  <i className="status-dot" aria-hidden="true" />
                ) : null}
                {item.status}
              </span>
            </div>
            <div className="roadmap-body">
              <span className="mono muted">{item.phase}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="mt-[20px] text-[12px]">
                <AccordionTrigger
                  aria-label={`Work in this area: ${item.title}`}
                >
                  Work in this area
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="m-0 pl-[16px] leading-[1.9] text-muted">
                    {item.items.map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </div>
            </div>
          </article>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
