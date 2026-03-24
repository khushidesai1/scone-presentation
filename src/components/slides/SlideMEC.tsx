import { Anim } from "./slide-shared";
import { DagGraph } from "./SconeShared";

// Vertical layout — same two parallel chains converging at E
const V_POS = {
  A: { x: 80,  y: 60  },
  B: { x: 80,  y: 210 },
  C: { x: 220, y: 60  },
  D: { x: 220, y: 210 },
  E: { x: 150, y: 340 },
};

// Larger version for the EG on the right (more spread out)
const EG_POS = {
  A: { x: 90,  y: 70  },
  B: { x: 90,  y: 240 },
  C: { x: 250, y: 70  },
  D: { x: 250, y: 240 },
  E: { x: 170, y: 400 },
};

// ViewBox for left DAGs
const DAG_VB_W = 300;
const DAG_VB_H = 390;
const DAG_RW = 230;
const DAG_RH = 299; // 230 * (390/300)

// ViewBox for right EG
const EG_VB_W = 340;
const EG_VB_H = 470;
const EG_RW = 380;
const EG_RH = 526; // 380 * (470/340)

function makeNodes(pos: typeof V_POS) {
  return Object.keys(pos).map((id) => ({
    id,
    ...pos[id as keyof typeof pos],
    color: "default" as "default",
    step: 0,
  }));
}

const dag1Edges = [
  { from: "A", to: "B", step: 0 },
  { from: "B", to: "E", step: 0 },
  { from: "C", to: "D", step: 0 },
  { from: "D", to: "E", step: 0 },
];
const dag2Edges = [
  { from: "B", to: "A", step: 0 },
  { from: "B", to: "E", step: 0 },
  { from: "D", to: "C", step: 0 },
  { from: "D", to: "E", step: 0 },
];
const cpdagEdges = [
  { from: "A", to: "B", step: 0, undirected: true },
  { from: "B", to: "E", step: 0, color: "blue" as const },
  { from: "C", to: "D", step: 0, undirected: true },
  { from: "D", to: "E", step: 0, color: "blue" as const },
];

export function SlideMEC() {
  return (
    <div className="slide-font h-dvh w-full flex flex-col px-8 pt-8 pb-4 bg-background overflow-hidden">
      {/* Header */}
      <div className="shrink-0 mb-3">
        <Anim delay={0} animation="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight">Markov Equivalence Class (MEC)</h1>
        </Anim>
      </div>

      {/* Body: left DAGs → right EG */}
      <div className="flex-1 flex items-center gap-3 min-h-0">

        {/* Left: two equivalent DAGs */}
        <div className="flex-1 flex flex-col gap-2">
          <Anim delay={200} animation="animate-in fade-in duration-500">
            <p className="text-2xl text-muted-foreground">
              <span className="font-bold text-foreground">Markov equivalence class (MEC):</span>{" "}
              set with all graphs that have the same conditional independencies
            </p>
          </Anim>

          {[dag1Edges, dag2Edges].map((edges, i) => (
            <Anim
              key={i}
              delay={350 + i * 200}
              animation="animate-in fade-in slide-in-from-left-4 duration-500"
            >
              <div className="rounded-2xl border bg-card shadow-sm flex items-center justify-center py-2">
                <DagGraph
                  nodes={makeNodes(V_POS)}
                  edges={edges}
                  width={DAG_RW}
                  height={DAG_RH}
                  viewBoxW={DAG_VB_W}
                  viewBoxH={DAG_VB_H}
                  stepDelay={0}
                />
              </div>
            </Anim>
          ))}
        </div>

        {/* Right: essential graph */}
        <div className="flex-1 flex flex-col gap-2">
          <Anim delay={900} animation="animate-in fade-in duration-500">
            <p className="text-2xl text-muted-foreground">
              <span className="font-bold text-foreground">Essential graph (EG):</span>{" "}
              graph (completed partial DAG) that represents the MEC
            </p>
          </Anim>

          <Anim
            delay={1050}
            animation="animate-in fade-in slide-in-from-right-4 duration-600"
          >
            <div className="rounded-2xl border-2 shadow-sm flex items-center justify-center py-2" style={{ borderColor: "#7aada7", background: "#C3D5D122" }}>
              <DagGraph
                nodes={makeNodes(EG_POS)}
                edges={cpdagEdges}
                width={EG_RW}
                height={EG_RH}
                viewBoxW={EG_VB_W}
                viewBoxH={EG_VB_H}
                stepDelay={0}
              />
            </div>
          </Anim>
        </div>

      </div>
    </div>
  );
}
