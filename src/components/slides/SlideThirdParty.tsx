import {
  Anim,
  LawFirmBox,
  ThirdPartyBox,
  BiDirectionalFlow,
  FIRM_AI_FLOWS,
} from "./slide-shared";

export function SlideThirdParty() {
  const T_3RD_PARTY = 400;
  const T_AI_FLOWS = 900;
  const T_ISSUES = 2200;
  const T_QUOTE = 2800;

  return (
    <div className="slide-font h-dvh w-full flex flex-col px-12 py-8 bg-background overflow-hidden">
      {/* Header */}
      <div className="shrink-0 mb-6">
        <Anim delay={0} animation="animate-in fade-in duration-300">
          <h1 className="text-4xl font-bold tracking-tight">
            The Current State
          </h1>
        </Anim>
        <Anim delay={0} animation="animate-in fade-in duration-300">
          <p className="text-xl text-muted-foreground mt-2">
            Where 3rd-party AI tools fall short
          </p>
        </Anim>
      </div>

      {/* Diagram: Law Firm ↔ 3rd Party AI */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <div className="flex items-stretch gap-0 w-full max-w-7xl">
          {/* Law Firm — appears instantly */}
          <LawFirmBox
            delay={0}
            partnersDelay={0}
            tree1Delay={0}
            associatesDelay={0}
            tree2Delay={0}
            toolsDelay={0}
          />

          {/* Firm ↔ 3rd Party AI flows */}
          <div className="w-56 shrink-0 flex flex-col justify-center gap-3 px-4">
            {FIRM_AI_FLOWS.map((flow, i) => (
              <BiDirectionalFlow
                key={flow.label}
                icon={flow.icon}
                label={flow.label}
                sublabel={flow.sublabel}
                status={flow.status}
                delay={T_AI_FLOWS + i * 180}
              />
            ))}
          </div>

          {/* 3rd Party AI */}
          <ThirdPartyBox delay={T_3RD_PARTY} issuesDelay={T_ISSUES} />
        </div>
      </div>

      {/* Quote */}
      <Anim
        delay={T_QUOTE}
        animation="animate-in fade-in duration-1000"
        className="shrink-0 mt-4 text-center"
      >
        <p className="text-base italic text-muted-foreground leading-relaxed">
          "All of the context from calls tends to get lost in the drafting so
          the red lines end up being pretty poor across the board."
        </p>
        <p className="mt-1.5 text-sm font-medium text-foreground/60">
          — Attorney feedback, Cleary Gottlieb / Clifford Chance
        </p>
      </Anim>
    </div>
  );
}
