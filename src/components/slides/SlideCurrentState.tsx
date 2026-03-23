import {
  Anim,
  ClientBox,
  LawFirmBox,
  BiDirectionalFlow,
  CLIENT_FLOWS,
} from "./slide-shared";

export function SlideCurrentState() {
  return (
    <div className="slide-font h-dvh w-full flex flex-col px-12 py-8 bg-background overflow-hidden">
      {/* Header */}
      <div className="shrink-0 mb-6">
        <Anim
          delay={0}
          animation="animate-in fade-in slide-in-from-top-4 duration-700"
        >
          <h1 className="text-4xl font-bold tracking-tight">
            The Current State
          </h1>
        </Anim>
        <Anim delay={150} animation="animate-in fade-in duration-500">
          <p className="text-xl text-muted-foreground mt-2">
            How law firms work with their clients today
          </p>
        </Anim>
      </div>

      {/* Diagram: Client ↔ Law Firm */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <div className="flex items-stretch gap-0 w-full max-w-7xl">
          {/* Client box */}
          <ClientBox delay={400} />

          {/* Client ↔ Firm flows */}
          <div className="w-56 shrink-0 flex flex-col justify-center gap-4 px-4">
            {CLIENT_FLOWS.map((flow, i) => (
              <BiDirectionalFlow
                key={flow.label}
                icon={flow.icon}
                label={flow.label}
                sublabel={flow.sublabel}
                delay={2200 + i * 200}
              />
            ))}
          </div>

          {/* Law Firm box */}
          <LawFirmBox
            delay={300}
            partnersDelay={700}
            tree1Delay={1100}
            associatesDelay={1300}
            tree2Delay={1700}
            toolsDelay={1900}
          />
        </div>
      </div>
    </div>
  );
}
