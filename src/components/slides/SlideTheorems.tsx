import { useState } from "react";
import { Anim } from "./slide-shared";
import { Latex } from "./SconeShared";

const THEOREM_PARTS = [
  {
    num: "1",
    title: "Monotonic enrichment",
    math: "\\mathrm{DirE}(H^{\\mathrm{obs}}) \\subseteq \\mathrm{DirE}(H^{\\mathrm{per}}) \\subseteq \\mathrm{DirE}(H^{\\mathrm{ctr}})",
    desc: "Contrastive recovers more edges than per-regime",
    color: "#1a4a44",
    bg: "#C3D5D122",
    border: "#7aada7",
  },
  {
    num: "2",
    title: "Gtest-soundness",
    math: "\\mathrm{DirE}(H^{\\mathrm{ctr}}) \\subseteq \\mathrm{DirE}(G^{\\mathrm{test}})",
    desc: "Orients edges in the reduced image",
    color: "#1a4a44",
    bg: "#C3D5D122",
    border: "#7aada7",
  },
  {
    num: "3",
    title: "Separation",
    math: "R \\neq \\emptyset \\implies \\mathrm{DirE}(H^{\\mathrm{per}}) \\subsetneq \\mathrm{DirE}(G^{\\mathrm{test}})",
    desc: "Without contrasts, some edges are unrecoverable",
    color: "#1a4a44",
    bg: "#C3D5D122",
    border: "#7aada7",
  },
];

const MEANING_POINTS = [
  "As n, T → ∞, SCONE recovers the test-induced restricted Ψ essential graph exactly",
  "Local PDAGs and invariance tests become correct; empirical Ψ-image matches population",
  "Witness coverage ensures every compelled edge is eventually sampled and oriented",
];

const TABS = [
  {
    label: "(1)",
    text: "Contrastive aggregation recovers more edges and is sound wrt G test",
  },
  {
    label: "(2)",
    text: "SCONE asymptotically recovers the correct essential graph",
  },
];

export function SlideTheorems() {
  const [active, setActive] = useState(0);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <div className="slide-font h-dvh w-full flex flex-col px-8 pt-8 pb-4 bg-background overflow-hidden">
      {/* Header */}
      <div className="shrink-0 mb-3">
        <Anim delay={0} animation="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight">Theorems</h1>
        </Anim>
      </div>

      <div className="flex-1 flex flex-col gap-3 min-h-0">

        {/* Tabs — no card wrapper */}
        <Anim delay={150} animation="animate-in fade-in duration-500">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">We prove</p>
          <div className="flex gap-4">
            {TABS.map((tab, i) => {
              const isActive = active === i;
              return (
                <button
                  key={tab.label}
                  onClick={() => { setActive(i); setExpandedCard(null); }}
                  className="flex gap-2 items-start flex-1 rounded-xl px-3 py-2 text-left transition-all duration-200 cursor-pointer"
                  style={isActive
                    ? { background: "#FFF0D955", border: "1.5px solid #d97706" }
                    : { border: "1.5px solid transparent", background: "transparent" }
                  }
                >
                  <span className="shrink-0 font-bold text-base mt-0.5" style={{ color: isActive ? "#92400e" : "inherit" }}>{tab.label}</span>
                  <p className="text-xl font-semibold" style={{ color: isActive ? "#92400e" : "inherit" }}>{tab.text}</p>
                </button>
              );
            })}
          </div>
        </Anim>

        {/* Content */}
        <div className="flex flex-col justify-start min-h-0 mt-2">
          {active === 0 ? (
            <div className="flex gap-3 items-start">
              {THEOREM_PARTS.map((part, i) => {
                const isExpanded = expandedCard === part.num;
                return (
                  <Anim key={part.num} delay={i * 120} animation="animate-in fade-in slide-in-from-bottom-4 duration-500" className="flex-1 flex flex-col gap-2">
                    <button
                      onClick={() => setExpandedCard(isExpanded ? null : part.num)}
                      className="w-full rounded-2xl border px-4 py-4 flex flex-col gap-3 text-left transition-all duration-200 cursor-pointer"
                      style={{
                        background: part.bg,
                        borderColor: isExpanded ? part.border : part.border + "99",
                        boxShadow: isExpanded ? `0 0 0 2px ${part.border}44` : undefined,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="size-7 rounded-lg flex items-center justify-center font-bold text-sm shrink-0"
                          style={{ background: part.border + "55", color: part.color }}
                        >
                          {part.num}
                        </div>
                        <p className="text-lg font-semibold" style={{ color: part.color }}>{part.title}</p>
                      </div>
                      <Latex block>{part.math}</Latex>
                    </button>

                    {/* Desc widget — pops out below on click */}
                    {isExpanded && (
                      <div className="px-4 py-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">What this means</p>
                        <p className="text-xl text-foreground">{part.desc}</p>
                      </div>
                    )}
                  </Anim>
                );
              })}
            </div>
          ) : (
            /* Theorem 2: main result + what it means */
            <div className="flex gap-6 items-start">
              <div className="flex-1 rounded-2xl border-2 px-5 py-4 flex items-center justify-center" style={{ borderColor: "#7aada7", background: "#C3D5D122" }}>
                <Latex block>{"\\Pr\\!\\left(\\hat{G} = G^{\\mathrm{test}}\\right) \\to 1 \\quad \\text{as } n, T \\to \\infty"}</Latex>
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">What this means</p>
                {MEANING_POINTS.map((pt, i) => (
                  <Anim key={i} delay={i * 120} animation="animate-in fade-in slide-in-from-bottom-2 duration-400">
                    <div className="flex gap-2.5 items-start">
                      <div className="mt-2.5 size-2.5 rounded-full bg-foreground/30 shrink-0" />
                      <p className="text-xl text-foreground">{pt}</p>
                    </div>
                  </Anim>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
