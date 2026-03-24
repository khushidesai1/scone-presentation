import { Anim } from "./slide-shared";
import { Latex } from "./SconeShared";

const INTRO_PARTS = [
  {
    label: "(1)",
    text: "Contrastive aggregation strictly recovers more edges than any non-contrastive approach",
    highlight: false,
  },
  {
    label: "(2)",
    text: "SCONE asymptotically recovers the correct essential graph",
    highlight: true,
  },
];

const MEANING_POINTS = [
  "Given enough data and subsets, SCONE recovers the exact ground-truth causal graph",
  "Errors in edge orientation vanish as sample size grows",
  "Every compelled edge is eventually observed via witness coverage",
];

export function SlideTheorem2() {
  return (
    <div className="slide-font h-dvh w-full flex flex-col px-8 pt-8 pb-4 bg-background overflow-hidden">
      {/* Header */}
      <div className="shrink-0 mb-3">
        <Anim delay={0} animation="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight">Theorem 2: Consistency</h1>
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

        <div className="flex gap-4 items-stretch">
          {/* Main result */}
          <Anim delay={350} animation="animate-in fade-in slide-in-from-left-4 duration-500" className="flex-1">
            <div className="rounded-2xl border-2 px-5 py-4 flex flex-col items-center justify-center gap-3 h-full" style={{ borderColor: "#7aada7", background: "#C3D5D122" }}>
              <p className="text-base font-semibold text-muted-foreground uppercase tracking-wide">Main result</p>
              <Latex block>{"\\Pr\\!\\left(\\hat{G} = G^{\\mathrm{test}}\\right) \\to 1 \\quad \\text{as } n, T \\to \\infty"}</Latex>
            </div>
          </Anim>

          {/* What it means */}
          <Anim delay={550} animation="animate-in fade-in slide-in-from-right-4 duration-500" className="flex-1">
            <div className="rounded-2xl border bg-card shadow-sm px-5 py-4 h-full flex flex-col gap-4">
              <p className="text-base font-semibold text-muted-foreground uppercase tracking-wide">What this means</p>
              {MEANING_POINTS.map((pt, i) => (
                <Anim key={i} delay={700 + i * 120} animation="animate-in fade-in slide-in-from-bottom-2 duration-400">
                  <div className="flex gap-2.5 items-start">
                    <div className="mt-2 size-1.5 rounded-full bg-foreground/30 shrink-0" />
                    <p className="text-lg text-foreground">{pt}</p>
                  </div>
                </Anim>
              ))}
            </div>
          </Anim>
        </div>

      </div>
    </div>
  );
}
