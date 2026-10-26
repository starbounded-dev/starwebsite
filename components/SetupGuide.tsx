"use client";
import { useRef, useState } from "react";
const steps = [
  {
    title: "Clone the source",
    description:
      "Clone the current dev branch, then change into the LuxEngine folder.",
    command:
      "git clone --branch dev --recursive https://github.com/starbounded-dev/LuxEngine.git",
  },
  {
    title: "Set up dependencies",
    description:
      "From the LuxEngine folder, check prerequisites and generate the solution. The docs cover the required SDKs.",
    command: ".\\scripts\\Setup.bat",
  },
  {
    title: "Build the editor",
    description:
      "In a Visual Studio Developer terminal, build Release, then set Editor as the startup project in Lux.sln.",
    command: 'MSBuild Lux.sln /restore /m /p:Configuration=Release /p:Platform="Mixed Platforms"',
  },
];
export function SetupGuide() {
  const [active, setActive] = useState(0);
  const [message, setMessage] = useState("");
  const codeRef = useRef<HTMLElement>(null);
  async function copy() {
    try {
      await navigator.clipboard.writeText(steps[active].command);
      setMessage("Copied to clipboard");
    } catch {
      if (codeRef.current) {
        const range = document.createRange();
        range.selectNodeContents(codeRef.current);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      setMessage("Command selected. Press Ctrl+C to copy.");
    }
  }
  return (
    <div className="setup-guide">
      <div
        className="setup-tabs"
        role="tablist"
        aria-label="Installation steps"
      >
        {steps.map((step, index) => (
          <button
            id={`setup-tab-${index}`}
            aria-controls="setup-panel"
            role="tab"
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            key={step.title}
            onClick={() => {
              setActive(index);
              setMessage("");
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                const next =
                  (active + (event.key === "ArrowRight" ? 1 : 2)) % 3;
                setActive(next);
                setMessage("");
                document.getElementById(`setup-tab-${next}`)?.focus();
              }
            }}
          >
            <span className="mono">0{index + 1}</span>
            {step.title}
          </button>
        ))}
      </div>
      <div
        className="setup-panel"
        id="setup-panel"
        role="tabpanel"
        aria-labelledby={`setup-tab-${active}`}
      >
        <div className="terminal-top mono">
          <span>
            <i /> <i /> <i />
          </span>
          WINDOWS / TERMINAL
        </div>
        <h3>{steps[active].title}</h3>
        <p>{steps[active].description}</p>
        <div className="command">
          <span aria-hidden="true">$</span>
          <code ref={codeRef}>{steps[active].command}</code>
          <button
            aria-label="Copy command"
            title="Copy command"
            type="button"
            onClick={copy}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <rect x="8" y="8" width="12" height="13" rx="1" />
              <path d="M16 8V3H3v13h5" />
            </svg>
          </button>
        </div>
        <div className="setup-note mono" aria-live="polite">
          {message ||
            `STEP ${active + 1} OF 3 · SOURCE ACCESS, NO PREBUILT DOWNLOAD`}
        </div>
      </div>
    </div>
  );
}
