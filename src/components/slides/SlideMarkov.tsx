import { useState } from "react";
import { Anim } from "./slide-shared";
import { DagGraph, Latex, GRAPH_POS, GRAPH_EDGE_DEFS, GRAPH_W, GRAPH_H } from "./SconeShared";

function GlobalFlipCard() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      style={{ perspective: "1000px" }}
      className="cursor-pointer select-none"
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.55s ease",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          position: "relative",
          minHeight: "140px",
        }}
      >
        {/* Front */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="rounded-2xl border bg-card shadow-sm p-3"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="size-7 rounded-lg flex items-center justify-center font-bold text-sm" style={{ background: "#D0B3B8", color: "#5a2535" }}>G</div>
            <h3 className="text-xl font-semibold">Global</h3>
            <span className="ml-auto text-xs text-muted-foreground/40">click to flip</span>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The joint distribution over all variables <span className="font-semibold text-foreground">factorizes</span>.
          </p>
          <div className="mt-2 rounded-lg bg-muted/50 px-3 py-2 flex justify-center">
            <Latex>{"P(X_1,\\ldots,X_n) = \\prod_i P(X_i \\mid \\text{Pa}(X_i))"}</Latex>
          </div>
        </div>

        {/* Back */}
        <div
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", position: "absolute", inset: 0, background: "#D0B3B8", borderColor: "#a87e87" }}
          className="rounded-2xl border shadow-sm p-3 flex items-center justify-center"
        >
          <p className="text-xl font-semibold text-center leading-snug" style={{ color: "#5a2535" }}>
            Graph tells you the independence relationships.
          </p>
        </div>
      </div>
    </div>
  );
}

function LocalFlipCard() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      style={{ perspective: "1000px" }}
      className="cursor-pointer select-none"
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.55s ease",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          position: "relative",
          minHeight: "140px",
        }}
      >
        {/* Front */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="rounded-2xl border bg-card shadow-sm p-3"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="size-7 rounded-lg flex items-center justify-center font-bold text-sm" style={{ background: "#C3D5D1", color: "#1a4a44" }}>L</div>
            <h3 className="text-xl font-semibold">Local</h3>
            <span className="ml-auto text-xs text-muted-foreground/40">click to flip</span>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Each node conditionally independent of{" "}
            <span className="font-semibold text-foreground">non-descendants</span> given{" "}
            <span className="font-semibold text-foreground">parents</span>.
          </p>
          <div className="mt-2 rounded-lg bg-muted/50 px-3 py-2 flex justify-center">
            <Latex>{"X \\perp \\text{NonDesc}(X) \\mid \\text{Pa}(X)"}</Latex>
          </div>
        </div>

        {/* Back */}
        <div
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", position: "absolute", inset: 0, background: "#C3D5D1", borderColor: "#7aada7" }}
          className="rounded-2xl border shadow-sm p-3 flex items-center justify-center"
        >
          <p className="text-xl font-semibold text-center leading-snug" style={{ color: "#1a4a44" }}>
            Each node only depends on its parents.
          </p>
        </div>
      </div>
    </div>
  );
}

// Same graph as slide 2; B is the focus node (orange), A is its parent (blue)
const NODE_COLORS: Record<string, "default" | "blue" | "orange"> = {
  A: "blue",
  B: "orange",
  C: "default",
  D: "default",
  E: "default",
};

const NODES = Object.entries(GRAPH_POS).map(([id], i) => ({
  id,
  ...GRAPH_POS[id],
  color: NODE_COLORS[id],
  step: i,
}));

const EDGES = GRAPH_EDGE_DEFS.map((e, i) => ({ ...e, step: i + 1 }));

export function SlideMarkov() {
  return (
    <div className="slide-font h-dvh w-full flex flex-col px-8 pt-8 pb-4 bg-background overflow-hidden">
      {/* Header */}
      <div className="shrink-0 mb-3">
        <Anim delay={0} animation="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight">Markov Property of Causal Graphs</h1>
        </Anim>
      </div>

      {/* Body */}
      <div className="flex-1 flex items-center gap-10 min-h-0">
        {/* Left: same graph with highlighted nodes */}
        <Anim
          delay={200}
          animation="animate-in fade-in duration-700"
          className="flex-1 flex flex-col items-center justify-center min-h-0"
        >
          <div className="rounded-2xl border bg-card shadow-sm px-3 py-2 flex flex-col items-center">
            <DagGraph
              nodes={NODES}
              edges={EDGES}
              width={GRAPH_W}
              height={GRAPH_H}
              stepDelay={320}
            />
            {/* Independence callout */}
            <Anim
              delay={2400}
              animation="animate-in fade-in slide-in-from-bottom-3 duration-500"
              className="w-full"
            >
              <div className="mt-3 rounded-xl border px-3 py-2 text-center" style={{ background: "#FFC09F44", borderColor: "#c17a50" }}>
                <p className="text-lg font-bold" style={{ color: "#5a2a0a" }}>
                  <Latex>{"B \\perp \\{C, D\\} \\mid A"}</Latex>
                </p>
                <p className="text-base mt-0.5" style={{ color: "#b86b3a" }}>
                  Given A, node B is independent of C and D
                </p>
              </div>
            </Anim>
          </div>
        </Anim>

        {/* Right: properties */}
        <div className="w-[44%] shrink-0 flex flex-col gap-4">
          <Anim delay={600} animation="animate-in fade-in slide-in-from-right-6 duration-600">
            <LocalFlipCard />
          </Anim>

          <Anim delay={1000} animation="animate-in fade-in slide-in-from-right-6 duration-600">
            <GlobalFlipCard />
          </Anim>

          <Anim
            delay={1600}
            animation="animate-in fade-in slide-in-from-right-4 duration-500"
          >
            <div className="rounded-xl bg-muted/40 border px-3 py-2">
              <p className="text-lg text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Key insight:</span> the graph
                encodes all conditional independence relationships in the data.
              </p>
            </div>
          </Anim>
        </div>
      </div>
    </div>
  );
}
