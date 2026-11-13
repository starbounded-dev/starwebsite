"use client";

import { LayoutGroup } from "motion/react";
import { useId, useState } from "react";
import { CopyCommand } from "./CopyCommand";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TabHighlight,
} from "./ui/tabs";

const steps = [
  {
    id: "clone",
    title: "Clone the source",
    description:
      "Clone the current dev branch, then change into the LuxEngine folder.",
    command:
      "git clone --branch dev --recursive https://github.com/starbounded-dev/LuxEngine.git",
  },
  {
    id: "setup",
    title: "Set up dependencies",
    description:
      "From the LuxEngine folder, check prerequisites and generate the solution. The docs cover the required SDKs.",
    command: ".\\scripts\\Setup.bat",
  },
  {
    id: "build",
    title: "Build the editor",
    description:
      "In a Visual Studio Developer terminal, build Release, then set Editor as the startup project in Lux.sln.",
    command:
      'MSBuild Lux.sln /restore /m /p:Configuration=Release /p:Platform="Mixed Platforms"',
  },
] as const;

export function SetupGuide() {
  const id = useId();
  const [active, setActive] = useState<string>(steps[0].id);
  return (
    <LayoutGroup id={id}>
      <Tabs
        value={active}
        onValueChange={setActive}
        className="min-w-0 overflow-hidden rounded-[14px] border border-line bg-surface"
      >
        <TabsList
          aria-label="Installation steps"
          className="grid grid-cols-3 border-b border-line"
        >
          {steps.map((step, index) => (
            <TabsTrigger
              key={step.id}
              value={step.id}
              className="border-0 border-r border-line px-[16px] py-[16px] text-left text-[14px] leading-[1.35] text-muted last:border-r-0 hover:text-ink focus-visible:outline-offset-[-4px] data-[state=active]:text-ink max-[760px]:px-[12px] max-[760px]:py-[14px] max-[760px]:text-[13px]"
            >
              {active === step.id ? (
                <TabHighlight
                  layoutId="setup-selection"
                  className="after:absolute after:inset-x-0 after:bottom-[-1px] after:h-[2px] after:bg-accent"
                />
              ) : null}
              <span className="mb-[6px] block text-accent">
                Step {index + 1}
              </span>
              {step.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {steps.map((step, index) => (
          <TabsContent
            key={step.id}
            value={step.id}
            className="p-[28px] max-[760px]:px-[18px] max-[760px]:py-[22px]"
          >
            <div>
              <h3 className="mb-[10px] text-[22px]">{step.title}</h3>
              <p className="mb-[24px] min-h-[52px] text-pretty text-muted">
                {step.description}
              </p>
              <CopyCommand
                command={step.command}
                note={`Step ${index + 1} of 3 on Windows. LuxEngine builds from source.`}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </LayoutGroup>
  );
}
