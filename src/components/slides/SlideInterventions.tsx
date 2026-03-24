import { useState } from "react";
import { Anim } from "./slide-shared";
import { DagGraph, Latex } from "./SconeShared";

const perfectBefore = {
  nodes: [
    { id: "A", x: 90,  y: 80,  step: 0, color: "default" as const },
    { id: "B", x: 220, y: 80,  step: 0, color: "default" as const },
    { id: "C", x: 310, y: 160, step: 0, color: "default" as const },
    { id: "D", x: 130, y: 160, step: 0, color: "default" as const },
  ],
  edges: [
    { from: "A", to: "B", step: 0 },
    { from: "B", to: "C", step: 0 },
    { from: "B", to: "D", step: 0 },
  ],
};

const perfectAfter = {
  nodes: [
    { id: "A", x: 90,  y: 80,  step: 0, color: "default" as const },
    { id: "B", x: 220, y: 80,  step: 0, color: "orange" as const, label: "B=b₀" },
    { id: "C", x: 310, y: 160, step: 0, color: "default" as const },
    { id: "D", x: 130, y: 160, step: 0, color: "default" as const },
  ],
  edges: [
    { from: "B", to: "C", step: 0 },
    { from: "B", to: "D", step: 0 },
  ],
};

const BULLETS = [
  { label: "Break parent edges", desc: "removes all incoming causal influences" },
  { label: "Set to fixed value", desc: null, math: "\\text{do}(X = x_0)" },
  { label: "Known targets", desc: "we know exactly which node was intervened on" },
];

const COUNTERPOINTS = [
  { title: "We don't know the targets", desc: "Intervention targets are unknown in practice" },
  { title: "Interventions aren't perfect", desc: "Mechanisms shift softly, not surgically" },
  { title: "We may only observe two regimes", desc: "One baseline + one shifted environment" },
];

export function SlideInterventions() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="slide-font h-dvh w-full flex flex-col px-8 pt-8 pb-4 bg-background overflow-hidden">
      <div className="shrink-0 mb-3">
        <Anim delay={0} animation="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight">Interventions</h1>
        </Anim>
      </div>

      <div className="flex-1 flex flex-col min-h-0 gap-3">

        {/* Perfect Interventions content */}
        <Anim delay={200} animation="animate-in fade-in duration-600">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-9 rounded-xl flex items-center justify-center font-bold text-sm" style={{ background: "#C3D5D1", color: "#1a4a44" }}>
                ✓
              </div>
              <h2 className="text-2xl font-semibold">Perfect (Hard) Interventions</h2>
            </div>

            <div className="flex flex-col gap-2 mb-3">
              {BULLETS.map((pt) => (
                <div key={pt.label} className="flex gap-3 items-start">
                  <div className="mt-2.5 size-2.5 rounded-full shrink-0" style={{ background: "#2e6b63" }} />
                  <p className="text-xl">
                    <span className="font-medium">{pt.label}</span>
                    {pt.math
                      ? <span className="text-muted-foreground"> — <Latex>{pt.math}</Latex></span>
                      : <span className="text-muted-foreground"> — {pt.desc}</span>
                    }
                  </p>
                </div>
              ))}
            </div>

            {/* Before / After DAGs */}
            <div className="flex gap-3 items-center justify-center">
              <div className="flex-1 rounded-xl border bg-muted/30 px-2 py-2 flex flex-col items-center">
                <p className="text-base text-center text-muted-foreground mb-1 font-semibold">Before</p>
                <DagGraph nodes={perfectBefore.nodes} edges={perfectBefore.edges} width={240} height={140} viewBoxW={360} viewBoxH={210} stepDelay={0} />
              </div>
              <div className="text-2xl text-muted-foreground/40 shrink-0">→</div>
              <div className="flex-1 rounded-xl border-2 px-2 py-2 flex flex-col items-center" style={{ borderColor: "#c17a50", background: "#FFC09F22" }}>
                <p className="text-base text-center mb-1 font-semibold flex items-center gap-1" style={{ color: "#5a2a0a" }}>
                  After <Latex>{"\\text{do}(B = b_0)"}</Latex>
                </p>
                <DagGraph nodes={perfectAfter.nodes} edges={perfectAfter.edges} width={240} height={140} viewBoxW={360} viewBoxH={210} stepDelay={0} />
              </div>
            </div>

            {/* CTA button */}
            {!revealed && (
              <Anim delay={800} animation="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => setRevealed(true)}
                    className="rounded-xl px-5 py-3 text-base font-semibold cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                    style={{ background: "#fce4e4", color: "#6b2535", border: "1.5px solid #d4a0a8" }}
                  >
                    But is this realistic? →
                  </button>
                </div>
              </Anim>
            )}
          </div>
        </Anim>

        {/* Reality check — slides in below */}
        {revealed && (
          <Anim delay={0} animation="animate-in fade-in slide-in-from-bottom-6 duration-500">
            <div
              className="cursor-pointer"
              onClick={() => setRevealed(false)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="size-9 rounded-xl flex items-center justify-center text-lg" style={{ background: "#F8E4DD", color: "#5a3428" }}>
                  ?
                </div>
                <h2 className="text-2xl font-semibold" style={{ color: "#6b2535" }}>But is this realistic?</h2>
              </div>

              <div className="flex gap-3">
                {COUNTERPOINTS.map((item, i) => (
                  <Anim key={item.title} delay={150 + i * 120} animation="animate-in fade-in slide-in-from-bottom-4 duration-400" className="flex-1">
                    <div className="rounded-xl px-5 py-4 h-full" style={{ background: "#e8c8cc", border: "1px solid #c9949c" }}>
                      <p className="text-xl font-semibold" style={{ color: "#6b2535" }}>{item.title}</p>
                      <p className="text-lg mt-1" style={{ color: "#8b4555" }}>{item.desc}</p>
                    </div>
                  </Anim>
                ))}
              </div>

              <p className="text-sm text-center mt-2" style={{ color: "#b87a8488" }}>click to close</p>
            </div>
          </Anim>
        )}

      </div>
    </div>
  );
}
