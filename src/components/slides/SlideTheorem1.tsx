import { Anim } from "./slide-shared";
import { Latex } from "./SconeShared";

const INTRO_PARTS = [
  {
    label: "(1)",
    text: "Contrastive aggregation strictly recovers more edges than any non-contrastive approach",
    highlight: true,
  },
  {
    label: "(2)",
    text: "SCONE asymptotically recovers the correct essential graph",
    highlight: false,
  },
];


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

export function SlideTheorem1() {
  return (
    <div className="slide-font h-dvh w-full flex flex-col px-8 pt-8 pb-4 bg-background overflow-hidden">
      {/* Header */}
      <div className="shrink-0 mb-3">
        <Anim delay={0} animation="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight">Theorem 1: Contrastive Aggregation Guarantee</h1>
        </Anim>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-4 min-h-0">

        {/* Intro: what we show */}
        <Anim delay={150} animation="animate-in fade-in duration-500">
          <div className="rounded-2xl border bg-card shadow-sm px-6 py-3">
            <p className="text-base font-semibold text-muted-foreground uppercase tracking-wide mb-2">We prove</p>
            <div className="flex gap-6">
              {INTRO_PARTS.map((p) => (
                <div
                  key={p.label}
                  className="flex gap-2 items-start flex-1 rounded-xl px-3 py-2"
                  style={p.highlight ? { background: "#FFF0D955", border: "1.5px solid #d97706" } : {}}
                >
                  <span className="shrink-0 font-bold text-base mt-0.5" style={p.highlight ? { color: "#92400e" } : { color: "inherit" }}>{p.label}</span>
                  <p className="text-lg font-semibold" style={p.highlight ? { color: "#92400e" } : { color: "inherit" }}>{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Anim>

        {/* Three theorem parts — horizontal */}
        <div className="flex gap-3">
          {THEOREM_PARTS.map((part, i) => (
            <Anim key={part.num} delay={600 + i * 180} animation="animate-in fade-in slide-in-from-bottom-4 duration-500" className="flex-1">
              <div
                className="rounded-2xl border px-4 py-4 flex flex-col gap-3 h-full"
                style={{ background: part.bg, borderColor: part.border }}
              >
                {/* Number badge + title */}
                <div className="flex items-center gap-2">
                  <div
                    className="size-7 rounded-lg flex items-center justify-center font-bold text-sm shrink-0"
                    style={{ background: part.border + "55", color: part.color }}
                  >
                    {part.num}
                  </div>
                  <p className="text-base font-semibold" style={{ color: part.color }}>{part.title}</p>
                </div>
                {/* Math */}
                <Latex block>{part.math}</Latex>
                {/* Description */}
                <p className="text-sm text-muted-foreground">{part.desc}</p>
              </div>
            </Anim>
          ))}
        </div>

      </div>
    </div>
  );
}
