import { useState } from "react";
import { Anim } from "./slide-shared";
import { DagGraph, Latex, GRAPH_POS, GRAPH_W, GRAPH_H } from "./SconeShared";
import { FlaskConical, TrendingUp, Brain, X } from "lucide-react";

// Shared graph nodes — same layout as slide 1 (A, B, C, D, E)
const mkNodes = (bColor: "default" | "orange", bLabel?: string, bDashed?: boolean) =>
  Object.entries(GRAPH_POS).map(([id]) => ({
    id,
    ...GRAPH_POS[id],
    step: 0,
    color: (id === "B" ? bColor : "default") as "default" | "orange",
    ...(id === "B" && bLabel ? { label: bLabel } : {}),
    ...(id === "B" && bDashed ? { dashed: true } : {}),
  }));

const env0Nodes = mkNodes("default");
const env1Nodes = mkNodes("orange", "B*", true);

const env0Edges = [
  { from: "A", to: "B", step: 0 },
  { from: "B", to: "E", step: 0 },
  { from: "C", to: "D", step: 0 },
  { from: "D", to: "E", step: 0 },
];

const env1Edges = [
  { from: "A", to: "B", step: 0, color: "orange" as const, dashed: true },
  { from: "B", to: "E", step: 0, color: "orange" as const, dashed: true },
  { from: "C", to: "D", step: 0 },
  { from: "D", to: "E", step: 0 },
];

const EXAMPLES = [
  {
    icon: FlaskConical,
    title: "ICB Treatment",
    line: "Drug shifts gene distributions without rewiring the regulatory network.",
    bg: "#D7EAD8", border: "#9ab99c", text: "#2d5a3a",
  },
  {
    icon: TrendingUp,
    title: "Policy Shifts in Economics",
    line: "Policy shifts some unknown economic relationships while others stay fixed.",
    bg: "#C3D5D1", border: "#7aada7", text: "#1a4a44",
  },
  {
    icon: Brain,
    title: "Neuroimaging",
    line: "Brain stimulation shifts signals from stationary to non-stationary without rewiring connectivity.",
    bg: "#D0B3B8", border: "#a87e87", text: "#5a2535",
  },
];

export function SlideSoftInterventions() {
  const [examplesOpen, setExamplesOpen] = useState(false);

  return (
    <div className="slide-font h-dvh w-full flex flex-col px-8 pt-8 pb-4 bg-background overflow-hidden relative">
      {/* Header + Real-world examples button */}
      <div className="shrink-0 mb-4 flex items-center justify-between">
        <Anim delay={0} animation="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight">Unknown Soft Interventions</h1>
        </Anim>
        <Anim delay={600} animation="animate-in fade-in duration-500">
          <button
            onClick={() => setExamplesOpen(true)}
            className="rounded-xl px-5 py-2.5 flex items-center gap-3 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            style={{ background: "#FFC09F33", border: "1.5px solid #c17a50" }}
          >
            <div className="size-8 rounded-lg flex items-center justify-center" style={{ background: "#c17a50", color: "#fff" }}>
              <FlaskConical className="size-4" />
            </div>
            <span className="text-base font-semibold" style={{ color: "#5a2a0a" }}>Real-world examples →</span>
          </button>
        </Anim>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col gap-4 min-h-0">
        {/* Bullet points */}
        <Anim delay={300} animation="animate-in fade-in slide-in-from-left-4 duration-600" className="shrink-0">
          <h3 className="text-2xl font-semibold mb-3">What changes vs. what doesn't</h3>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-start">
              <div className="mt-2 size-2 rounded-full shrink-0 bg-foreground/30" />
              <p className="text-xl font-medium">Graph structure is preserved</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="mt-2 size-2 rounded-full shrink-0 bg-foreground/30" />
              <div>
                <p className="text-xl font-medium">Conditional distributions shift</p>
                <div className="mt-2 rounded-lg bg-muted/50 px-4 py-2 inline-block">
                  <Latex>{"P^{(0)}(v \\mid \\mathrm{PA}(v)) \\neq P^{(1)}(v \\mid \\mathrm{PA}(v))"}</Latex>
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="mt-2 size-2 rounded-full shrink-0 bg-foreground/30" />
              <p className="text-xl font-medium">Intervention targets are unknown</p>
            </div>
          </div>
        </Anim>

        {/* Two DAGs — fills remaining space */}
        <Anim delay={500} animation="animate-in fade-in duration-600" className="flex-1 min-h-0">
          <div className="h-full flex gap-6 items-center">
            <div className="flex-1 rounded-xl border bg-muted/30 px-3 pt-3 pb-2 flex flex-col items-center h-full justify-center">
              <p className="text-lg font-semibold text-muted-foreground mb-2">Environment 0</p>
              <DagGraph
                nodes={env0Nodes}
                edges={env0Edges}
                width={300}
                height={330}
                viewBoxW={GRAPH_W}
                viewBoxH={GRAPH_H}
                stepDelay={0}
              />
            </div>
            <div className="flex-1 rounded-xl border-2 px-3 pt-3 pb-2 flex flex-col items-center h-full justify-center"
                 style={{ borderColor: "#c17a50", background: "#FFC09F18" }}>
              <p className="text-lg font-semibold mb-2" style={{ color: "#5a2a0a" }}>Environment 1</p>
              <DagGraph
                nodes={env1Nodes}
                edges={env1Edges}
                width={300}
                height={330}
                viewBoxW={GRAPH_W}
                viewBoxH={GRAPH_H}
                stepDelay={0}
              />
            </div>
          </div>
        </Anim>
      </div>

      {/* Slide-up overlay */}
      <div
        className="absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-x shadow-2xl bg-background z-50 flex flex-col"
        style={{
          transform: examplesOpen ? "translateY(0%)" : "translateY(105%)",
          transition: "transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
          height: "55%",
        }}
      >
        <div className="flex items-center justify-between px-8 pt-5 pb-3 shrink-0 border-b">
          <h2 className="text-2xl font-bold">Real-world examples</h2>
          <button
            onClick={() => setExamplesOpen(false)}
            className="size-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex-1 flex gap-5 px-8 py-5 min-h-0">
          {EXAMPLES.map((ex) => (
            <div
              key={ex.title}
              className="flex-1 rounded-2xl border p-5 flex flex-col gap-3"
              style={{ background: ex.bg + "55", borderColor: ex.border }}
            >
              <div className="size-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: ex.border, color: "#fff" }}>
                <ex.icon className="size-6" />
              </div>
              <p className="text-lg font-semibold" style={{ color: ex.text }}>{ex.title}</p>
              <p className="text-lg leading-relaxed text-muted-foreground">{ex.line}</p>
            </div>
          ))}
        </div>
      </div>

      {examplesOpen && (
        <div className="absolute inset-0 bg-black/15 z-40" onClick={() => setExamplesOpen(false)} />
      )}
    </div>
  );
}
