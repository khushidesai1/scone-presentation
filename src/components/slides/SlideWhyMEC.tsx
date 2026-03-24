import { Anim } from "./slide-shared";
import { DagGraph, Latex } from "./SconeShared";

// Observational: three equivalent DAGs (we can't distinguish)
const obsNodes = [
  { id: "A", x: 60,  y: 80, step: 0, color: "default" as const },
  { id: "B", x: 170, y: 80, step: 0, color: "default" as const },
  { id: "C", x: 280, y: 80, step: 0, color: "default" as const },
];
const obsEdges1 = [{ from: "A", to: "B", step: 0 }, { from: "B", to: "C", step: 0 }];
const obsEdges2 = [{ from: "B", to: "A", step: 0 }, { from: "B", to: "C", step: 0 }];
const obsEdges3 = [{ from: "C", to: "B", step: 0 }, { from: "B", to: "A", step: 0 }];

// Interventional: we can identify A → B → C uniquely
const intNodes = [
  { id: "A", x: 60,  y: 80, step: 0, color: "green" as const },
  { id: "B", x: 170, y: 80, step: 0, color: "green" as const },
  { id: "C", x: 280, y: 80, step: 0, color: "green" as const },
];
const intEdges = [
  { from: "A", to: "B", step: 0, color: "blue" as const },
  { from: "B", to: "C", step: 0, color: "blue" as const },
];

export function SlideWhyMEC() {
  return (
    <div className="slide-font h-dvh w-full flex flex-col px-8 pt-8 pb-4 bg-background overflow-hidden">
      {/* Header */}
      <div className="shrink-0 mb-3">
        <Anim delay={0} animation="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight">
            Why do we care about MEC and EG?
          </h1>
        </Anim>
      </div>

      {/* Two columns */}
      <div className="flex-1 flex items-start gap-8 min-h-0">
        {/* Left: observational */}
        <Anim
          delay={300}
          animation="animate-in fade-in slide-in-from-left-6 duration-600"
          className="flex-1"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-9 rounded-xl flex items-center justify-center font-bold text-sm" style={{ background: "#F8E4DD", color: "#5a3428" }}>
                Obs
              </div>
              <h2 className="text-2xl font-semibold">Observational Data Only</h2>
            </div>

            <div className="flex flex-col gap-1.5 mb-4 w-full">
              {[
                "Can only recover graphs up to an MEC of the true graph",
                "Same skeleton and v-structures — edge directions ambiguous",
              ].map((pt, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="mt-2.5 size-2.5 rounded-full shrink-0" style={{ background: "#8b5e4e" }} />
                  <p className="text-xl text-muted-foreground">{pt}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 w-full">
              {[obsEdges1, obsEdges2, obsEdges3].map((edges, i) => (
                <Anim
                  key={i}
                  delay={500 + i * 200}
                  animation="animate-in fade-in slide-in-from-left-3 duration-400"
                  className="w-full"
                >
                  <div className="rounded-xl border bg-card p-2 flex justify-center">
                    <DagGraph
                      nodes={obsNodes}
                      edges={edges}
                      width={320}
                      height={130}
                      stepDelay={0}
                    />
                  </div>
                </Anim>
              ))}
            </div>
          </div>
        </Anim>

        {/* Divider */}
        <div className="w-px bg-border shrink-0 self-stretch" />

        {/* Right: interventional */}
        <Anim
          delay={600}
          animation="animate-in fade-in slide-in-from-right-6 duration-600"
          className="flex-1"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-9 rounded-xl flex items-center justify-center font-bold text-sm" style={{ background: "#D7EAD8", color: "#2d5a3a" }}>
                Int
              </div>
              <h2 className="text-2xl font-semibold">With Interventional Data</h2>
            </div>

            <div className="flex flex-col gap-1.5 mb-4">
              {[
                "We can do better with interventional data",
                "Interventions can shrink the equivalence class",
              ].map((pt, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="mt-2.5 size-2.5 rounded-full shrink-0" style={{ background: "#4a7a55" }} />
                  <p className="text-xl text-muted-foreground">{pt}</p>
                </div>
              ))}
            </div>

            <Anim delay={900} animation="animate-in fade-in slide-in-from-right-3 duration-500">
              <div className="rounded-xl border-2 px-6 py-5 flex flex-col items-center gap-4" style={{ borderColor: "#9ab99c", background: "#D7EAD822" }}>
                <Latex block>{"\\left|\\text{I-MEC}_{\\mathcal{I}}(\\mathcal{G})\\right| \\leq \\left|\\text{MEC}(\\mathcal{G})\\right|"}</Latex>
                <p className="text-lg text-center" style={{ color: "#2d5a3a" }}>
                  <Latex>{"\\text{I-MEC}_{\\mathcal{I}}"}</Latex>{" "}is the interventional MEC
                </p>
              </div>
            </Anim>
          </div>
        </Anim>
      </div>
    </div>
  );
}
