import { useState } from "react";
import { Anim } from "./slide-shared";
import { Latex } from "./SconeShared";

const PIPELINE = [
  { id: "input", label: "Input", sub: "B × N × S × c", clickable: false },
  { id: "sampling", label: "Subset Sampling", clickable: true },
  { id: "cd", label: "CD Ensemble", clickable: true },
  { id: "token", label: "Tokenization", clickable: true },
  { id: "reparam", label: "Reparameterized", clickable: true },
];

// --- Stage definitions ---
const STAGES: { id: string; label: string; color: string; bg: string; content: JSX.Element }[] = [
  {
    id: "sampling",
    label: "Subset Sampling",
    color: "#b45309",
    bg: "#FEF3C718",
    content: (
      <div className="flex gap-6 items-start">
        <img src="/subsampling.png" alt="Subset sampling" className="object-contain rounded shrink-0" style={{ height: 200, width: "auto" }} />
        <div className="flex flex-col gap-4 flex-1 min-w-0">
          <p className="text-xl text-foreground">Greedy selection of <strong>T</strong> admissible subsets using exploration–exploitation scoring</p>
          {[
            { lbl: "Node sensitivity",  eq: String.raw`s_i = \tfrac{1}{C}\!\sum_c \frac{|\mu_i^{(c)} - \mu_i^{(0)}|}{\sigma_i} + I(X_i;\, R)` },
            { lbl: "Pairwise contrast", eq: String.raw`\Gamma_{ij} = |\mathrm{corr}^{(1)}_{ij} - \mathrm{corr}^{(0)}_{ij}|` },
            { lbl: "Visit-count decay", eq: String.raw`\alpha^t_{ij} = \alpha_{ij}\, / \, q^{\,n^t_{ij}}` },
          ].map((item) => (
            <div key={item.lbl} className="flex flex-col gap-1">
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{item.lbl}</span>
              <div className="rounded-lg px-4 py-1.5" style={{ background: "#f1f5f9" }}>
                <Latex block>{item.eq}</Latex>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "cd",
    label: "CD Ensemble",
    color: "#6d28d9",
    bg: "#F5F3FF18",
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-lg text-foreground">
          Classical causal discovery ensemble applied <strong>per subset, per regime</strong> — bootstrap replicates with majority voting
        </p>
        <div className="flex gap-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Output: local PDAGs</span>
            <div className="rounded-lg px-5 py-2" style={{ background: "#f1f5f9" }}>
              <Latex block>{String.raw`E_S^{(c)} = D^{(c)}(P_S^{(c)})`}</Latex>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">One-hot edge class</span>
            <div className="rounded-lg px-5 py-2" style={{ background: "#f1f5f9" }}>
              <Latex block>{String.raw`\hat{e}_{i,j} = \mathbf{1}\{e_{i,j}\} \in \{0,1\}^4`}</Latex>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "token",
    label: "Tokenization",
    color: "#7aada7",
    bg: "#C3D5D118",
    content: (
      <div className="flex gap-6 items-stretch">
        {/* Edge stream */}
        <div className="flex-1 rounded-xl border-2 px-6 py-4 flex flex-col gap-3"
          style={{ borderColor: "#7aada7", background: "#C3D5D122" }}>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold" style={{ color: "#1a4a44" }}><Latex>{"H_E"}</Latex></span>
            <code className="text-sm font-mono text-muted-foreground">B × T × K × 2 × d</code>
          </div>
          <p className="text-lg text-foreground">Edge stream from CD output via MLP + positional embeddings</p>
          <div className="rounded-lg px-4 py-2" style={{ background: "#f1f5f9" }}>
            <Latex block>{String.raw`H_E[t,e,c,:] = \mathrm{MLP}(x_{e,c}) + \mathrm{PE}_T(t) + \mathrm{PE}_K(k)`}</Latex>
          </div>
        </div>
        {/* Global stream */}
        <div className="flex-1 rounded-xl border-2 px-6 py-4 flex flex-col gap-3"
          style={{ borderColor: "#a87e87", background: "#D0B3B818" }}>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold" style={{ color: "#5a2535" }}><Latex>{"H_\\rho"}</Latex></span>
            <code className="text-sm font-mono text-muted-foreground">B × N × N × d</code>
          </div>
          <p className="text-lg text-foreground">Global stream from inverse covariance averaged across regimes</p>
          <div className="rounded-lg px-4 py-2" style={{ background: "#f1f5f9" }}>
            <Latex block>{String.raw`\hat{\Omega} = \tfrac{1}{2}\!\left(\Sigma^{-1}(\bar{X}) + \Sigma^{-1}(\bar{X})^\top\right)`}</Latex>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "reparam",
    label: "Reparameterized",
    color: "#7aada7",
    bg: "#C3D5D118",
    content: (
      <div className="flex flex-col gap-3 w-fit">
        <p className="text-xl text-foreground mb-1">Disentangle regime-invariant structure from regime-specific variation</p>
        {[
          { lbl: "Invariant", eq: String.raw`z_{\mathrm{avg}} = \tfrac{1}{2}(H_E^{(1)}+H_E^{(0)})`, out: String.raw`H_E^{(0)}`, c: "#1a4a44", bc: "#7aada7", bg: "#C3D5D133" },
          { lbl: "Contrast",  eq: String.raw`z_{\Delta} = H_E^{(1)} - H_E^{(0)}`,                      out: String.raw`H_E^{(1)}`, c: "#1a4a44", bc: "#7aada7", bg: "#C3D5D122" },
        ].map((row) => (
          <div key={row.lbl} className="flex items-center gap-3">
            <div className="rounded-xl border-2 px-5 py-2.5 flex items-center gap-5"
              style={{ borderColor: row.bc, background: row.bg }}>
              <span className="text-base font-bold uppercase tracking-wide shrink-0" style={{ color: row.c }}>{row.lbl}</span>
              <Latex block>{row.eq}</Latex>
            </div>
            <span className="text-lg text-muted-foreground/50 shrink-0">→</span>
            <div className="rounded-xl border-2 px-4 py-2.5 flex items-center justify-center shrink-0"
              style={{ borderColor: row.bc, background: row.bg, minWidth: 80 }}>
              <span className="text-lg font-bold" style={{ color: row.c }}><Latex>{row.out}</Latex></span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

// --- Node button styles ---
const BTN_COLORS: Record<string, { border: string; bg: string; color: string; shadow: string }> = {
  sampling: { border: "#b45309", bg: "#FEF3C733", color: "#92400e", shadow: "#b4530922" },
  cd:       { border: "#6d28d9", bg: "#F5F3FF33", color: "#4c1d95", shadow: "#6d28d922" },
  token:    { border: "#7aada7", bg: "#C3D5D133", color: "#1a4a44", shadow: "#7aada722" },
  reparam:  { border: "#7aada7", bg: "#C3D5D133", color: "#1a4a44", shadow: "#7aada722" },
};

export function SlideModelSampling() {
  const [active, setActive] = useState<string | null>(null);
  const activeStage = STAGES.find((s) => s.id === active) ?? null;
  const toggle = (id: string) => setActive((prev) => (prev === id ? null : id));

  return (
    <div className="slide-font h-dvh w-full flex flex-col px-8 pt-8 pb-4 bg-background overflow-hidden">
      <div className="shrink-0 mb-4">
        <Anim delay={0} animation="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight">Sampling &amp; Tokenization</h1>
        </Anim>
      </div>

      <div className="flex-1 flex flex-col gap-3 min-h-0">

        {/* Pipeline — horizontal boxes with arrows */}
        <Anim delay={150} animation="animate-in fade-in duration-600">
          <div className="flex items-center gap-0">
            {PIPELINE.map((node, i) => {
              const isActive = active === node.id;
              const colors = node.clickable ? BTN_COLORS[node.id] : null;
              return (
                <div key={node.id} className="flex items-center">
                  {i > 0 && (
                    <svg width="32" height="20" viewBox="0 0 32 20" className="shrink-0">
                      <line x1="0" y1="10" x2="24" y2="10" stroke="#94a3b8" strokeWidth="2" />
                      <polygon points="24,5 32,10 24,15" fill="#94a3b8" />
                    </svg>
                  )}
                  {node.clickable ? (
                    <button
                      onClick={() => toggle(node.id)}
                      className="rounded-xl border-2 px-5 py-3 text-base font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap hover:scale-[1.02]"
                      style={{
                        borderColor: isActive ? colors!.border : "#e2e8f0",
                        background: isActive ? colors!.bg : "var(--card)",
                        color: isActive ? colors!.color : "#475569",
                        boxShadow: isActive ? `0 0 0 3px ${colors!.shadow}` : undefined,
                      }}
                    >
                      {node.label}
                    </button>
                  ) : (
                    <div className="rounded-xl border bg-card shadow-sm px-5 py-3 flex flex-col items-center">
                      <span className="text-base font-semibold text-foreground">{node.label}</span>
                      {node.sub && <code className="text-sm font-mono text-muted-foreground mt-0.5">{node.sub}</code>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Anim>

        {/* Detail panel */}
        <div className="flex-1 min-h-0 flex justify-center items-start overflow-auto">
          {activeStage ? (
            <div
              key={activeStage.id}
              className="rounded-2xl border-2 px-6 py-4 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-250"
              style={{ borderColor: activeStage.color, background: activeStage.bg }}
            >
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: activeStage.color }}>
                {activeStage.label}
              </p>
              {activeStage.content}
            </div>
          ) : (
            <div className="flex items-center justify-center h-12 text-muted-foreground/30 text-sm select-none">
              click a stage to explore
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
