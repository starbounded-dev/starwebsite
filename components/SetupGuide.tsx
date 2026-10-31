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
        className="min-w-0 overflow-hidden rounded-[12px] border border-line bg-paper"
      >
        <TabsList
          aria-label="Installation steps"
          className="grid grid-cols-3 border-b border-line"
        >
          {steps.map((step, index) => (
            <TabsTrigger
              key={step.id}
              value={step.id}
              className="border-0 border-r border-line px-[14px] py-[18px] text-left text-[11px] leading-[1.5] text-muted last:border-r-0 hover:text-accent focus-visible:outline-offset-[-4px] data-[state=active]:text-accent max-[760px]:px-[10px] max-[760px]:py-[14px] max-[760px]:text-[10px]"
            >
              {active === step.id ? (
                <TabHighlight
                  layoutId="setup-selection"
                  className="after:absolute after:inset-x-0 after:bottom-[-1px] after:h-[2px] after:bg-accent"
                />
              ) : null}
              <span className="mono mb-[8px] block text-[10px]">
                0{index + 1}
              </span>
              {step.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {steps.map((step, index) => (
          <TabsContent
            key={step.id}
            value={step.id}
            className="p-[27px] max-[760px]:px-[18px] max-[760px]:py-[23px]"
          >
            <div>
              <div className="mono mb-[27px] flex items-center justify-between gap-[15px] text-[9px] text-muted">
                <span aria-hidden="true" className="flex gap-[5px]">
                  {[0, 1, 2].map((dot) => (
                    <i
                      key={dot}
                      className="block size-[5px] rounded-full bg-line"
                    />
                  ))}
                </span>
                WINDOWS / TERMINAL
              </div>
              <h3 className="mb-[14px] text-[23px] font-medium">
                {step.title}
              </h3>
              <p className="mb-[25px] min-h-[48px] text-[13px] leading-[1.8] text-muted max-[760px]:text-[12px]">
                {step.description}
              </p>
              <CopyCommand
                command={step.command}
                note={`STEP ${index + 1} OF 3 · SOURCE ACCESS, NO PREBUILT DOWNLOAD`}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </LayoutGroup>
  );
}
