import { Anim } from "./slide-shared";
import { DagGraph, GRAPH_POS, GRAPH_EDGE_DEFS, GRAPH_W, GRAPH_H } from "./SconeShared";

const DAG_NODES = Object.entries(GRAPH_POS).map(([id], i) => ({
  id,
  ...GRAPH_POS[id],
  color: "default" as const,
  step: i,
}));

const DAG_EDGES = GRAPH_EDGE_DEFS.map((e, i) => ({ ...e, step: i + 1 }));

const POINTS = [
  {
    label: "Directed Acyclic Graph (DAG)",
    body: "Learn a graph where nodes are variables and edges are causal relationships.",
    delay: 300,
  },
  {
    label: "Nodes",
    body: "Random variables — genes, gene modules, or any measurable quantity.",
    delay: 650,
  },
  {
    label: "Edges",
    body: "A → B means A directly causes B.",
    delay: 1000,
  },
];

export function SlideCausalDiscovery() {
  return (
    <div className="slide-font h-dvh w-full flex flex-col px-8 pt-8 pb-4 bg-background overflow-hidden">
      {/* Header */}
      <div className="shrink-0 mb-3">
        <Anim delay={0} animation="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight">What is Causal Discovery?</h1>
        </Anim>
      </div>

      {/* Body */}
      <div className="flex-1 flex items-center gap-10 min-h-0">
        {/* Left: 3 bullet points, big text */}
        <div className="w-[38%] shrink-0 flex flex-col gap-6">
          {POINTS.map((pt) => (
            <Anim
              key={pt.label}
              delay={pt.delay}
              animation="animate-in fade-in slide-in-from-left-4 duration-500"
            >
              <div className="flex gap-4 items-start">
                <div className="mt-3 size-2.5 rounded-full bg-foreground/30 shrink-0" />
                <div>
                  <p className="text-2xl font-bold text-foreground leading-snug">{pt.label}</p>
                  <p className="text-xl text-muted-foreground leading-relaxed mt-1">{pt.body}</p>
                </div>
              </div>
            </Anim>
          ))}
        </div>

        {/* Right: vertical DAG */}
        <Anim
          delay={200}
          animation="animate-in fade-in duration-700"
          className="flex-1 flex items-center justify-center min-h-0"
        >
          <div className="rounded-2xl border bg-card shadow-sm px-3 py-2 flex flex-col items-center">
            <DagGraph
              nodes={DAG_NODES}
              edges={DAG_EDGES}
              width={GRAPH_W}
              height={GRAPH_H}
              stepDelay={380}
            />
          </div>
        </Anim>
      </div>
    </div>
  );
}
