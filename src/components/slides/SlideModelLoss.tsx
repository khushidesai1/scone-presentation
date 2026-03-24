import { Anim } from "./slide-shared";
import { Latex } from "./SconeShared";

const LOSSES = [
  {
    name: "ℒ_CE",
    desc: "Cross-entropy over edge orientations",
    eq: String.raw`-\!\sum_{(i,j)} \log p_\theta(y_{ij})`,
    bg: "#C3D5D122", border: "#7aada7", color: "#1a4a44",
  },
  {
    name: "ℒ_SHD",
    desc: "Soft structural Hamming distance",
    eq: String.raw`\sum_{(i,j)} (\hat{p}_{ij} - y_{ij})^2`,
    bg: "#D0B3B822", border: "#a87e87", color: "#5a2535",
  },
  {
    name: "ℒ_rank",
    desc: "Pairwise hinge on true vs. non-edges",
    eq: String.raw`\sum \max(0,\; 1 - \hat{p}_{\mathrm{true}} + \hat{p}_{\mathrm{false}})`,
    bg: "#FFC09F33", border: "#c17a50", color: "#5a2a0a",
  },
  {
    name: "ℒ_global",
    desc: "Auxiliary N×N head loss",
    eq: String.raw`\mathcal{L}_{\mathrm{CE}}^{N\times N}`,
    bg: "#f8fafc", border: "#94a3b8", color: "#475569",
  },
];

const OPT_ITEMS = [
  { title: "AdamW", desc: "Warmup + cosine LR schedule" },
  { title: "EMA weights", desc: "Used at evaluation time" },
  { title: "Gate regularization", desc: "Encourages bias head activation" },
];

export function SlideModelLoss() {
  return (
    <div className="slide-font h-dvh w-full flex flex-col px-8 pt-8 pb-4 bg-background overflow-hidden">
      {/* Header */}
      <div className="shrink-0 mb-4">
        <Anim delay={0} animation="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight">Loss &amp; Optimization</h1>
        </Anim>
      </div>

      <div className="flex-1 flex flex-col gap-5 min-h-0">

        {/* Training objective */}
        <Anim delay={150} animation="animate-in fade-in duration-600">
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Training Objective</p>
          <div className="flex justify-center">
            <Latex block>
              {String.raw`\mathcal{L} = \mathcal{L}_{\mathrm{CE}} + \lambda_{\mathrm{SHD}}\,\mathcal{L}_{\mathrm{SHD}} + \lambda_{\mathrm{rank}}\,\mathcal{L}_{\mathrm{rank}} + \lambda_{\mathrm{global}}\,\mathcal{L}_{\mathrm{global}}`}
            </Latex>
          </div>
        </Anim>

        {/* Loss terms — 4 cards */}
        <div className="flex gap-4">
          {LOSSES.map((loss, i) => (
            <Anim key={loss.name} delay={300 + i * 120} animation="animate-in fade-in slide-in-from-bottom-4 duration-500" className="flex-1">
              <div
                className="rounded-2xl px-5 py-4 flex flex-col gap-2 h-full"
                style={{ background: loss.bg, border: `1.5px solid ${loss.border}` }}
              >
                <p className="text-xl font-bold" style={{ color: loss.color }}>{loss.name}</p>
                <p className="text-lg text-foreground">{loss.desc}</p>
                <div className="rounded-lg px-3 py-1.5 mt-auto" style={{ background: "#f1f5f9" }}>
                  <Latex block>{loss.eq}</Latex>
                </div>
              </div>
            </Anim>
          ))}
        </div>

        {/* Optimization */}
        <Anim delay={900} animation="animate-in fade-in slide-in-from-bottom-4 duration-600">
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">Optimization</p>
          <div className="flex gap-4">
            {OPT_ITEMS.map((item, i) => (
              <div key={i} className="flex-1 flex items-start gap-3">
                <div className="mt-1.5 size-2 rounded-full bg-foreground/30 shrink-0" />
                <div>
                  <p className="text-xl font-semibold text-foreground">{item.title}</p>
                  <p className="text-lg text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Anim>

      </div>
    </div>
  );
}
