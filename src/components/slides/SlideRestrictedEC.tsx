import { Anim } from "./slide-shared";
import { Latex } from "./SconeShared";

const PSI_POINTS = [
  "Observes all conditional independencies in each environment",
  "Observes all shared causal mechanisms across environments",
];

const SCONE_POINTS = [
  "Sees limited graph structure within small sampled subsets",
  "Only checks whether specific variables behave the same across environments",
];

export function SlideRestrictedEC() {
  return (
    <div className="slide-font h-dvh w-full flex flex-col px-8 pt-8 pb-4 bg-background overflow-hidden">
      {/* Header */}
      <div className="shrink-0 mb-4">
        <Anim delay={0} animation="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight">Restricted Ψ-Equivalence Class</h1>
        </Anim>
      </div>

      <div className="flex-1 flex flex-col gap-5 min-h-0">

        {/* Ψ-Markov: Global Oracle */}
        <Anim delay={200} animation="animate-in fade-in duration-600">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1.5 rounded-lg text-lg font-bold" style={{ background: "#D0B3B8", color: "#5a2535" }}>
              Global Oracle
            </span>
            <p className="text-xl font-semibold">Ψ-Markov (Jaber et al.)</p>
          </div>
          <div className="flex flex-col gap-2 ml-1">
            {PSI_POINTS.map((pt, i) => (
              <Anim key={i} delay={350 + i * 100} animation="animate-in fade-in slide-in-from-left-3 duration-400">
                <div className="flex gap-3 items-start">
                  <div className="mt-2.5 size-2.5 rounded-full shrink-0" style={{ background: "#a87e87" }} />
                  <p className="text-xl text-foreground">{pt}</p>
                </div>
              </Anim>
            ))}
          </div>
        </Anim>

        {/* Arrow transition */}
        <Anim delay={600} animation="animate-in fade-in duration-400">
          <div className="flex justify-center">
            <div className="text-2xl text-muted-foreground/40">↓</div>
          </div>
        </Anim>

        {/* SCONE: Subset-Restricted */}
        <Anim delay={700} animation="animate-in fade-in duration-600">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1.5 rounded-lg text-lg font-bold" style={{ background: "#C3D5D1", color: "#1a4a44" }}>
              Subset-Restricted
            </span>
            <p className="text-xl font-semibold">SCONE (Our Setting)</p>
          </div>
          <div className="flex flex-col gap-2 ml-1">
            {SCONE_POINTS.map((pt, i) => (
              <Anim key={i} delay={850 + i * 100} animation="animate-in fade-in slide-in-from-left-3 duration-400">
                <div className="flex gap-3 items-start">
                  <div className="mt-2.5 size-2.5 rounded-full shrink-0" style={{ background: "#7aada7" }} />
                  <p className="text-xl text-foreground">{pt}</p>
                </div>
              </Anim>
            ))}
          </div>
        </Anim>

        {/* Key result card with invariance */}
        {/* Three key results */}
        <div className="flex gap-4">
          <Anim delay={1100} animation="animate-in fade-in slide-in-from-bottom-4 duration-500" className="flex-1">
            <div className="rounded-2xl border bg-card shadow-sm px-5 py-4 h-full flex flex-col gap-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Invariance</p>
              <Latex block>{"\\mathrm{Inv}(v \\mid Z) := \\mathbf{1}\\!\\left[P^{(0)}(X_v \\mid X_Z) = P^{(1)}(X_v \\mid X_Z)\\right]"}</Latex>
            </div>
          </Anim>

          <Anim delay={1250} animation="animate-in fade-in slide-in-from-bottom-4 duration-500" className="flex-1">
            <div className="rounded-2xl border bg-card shadow-sm px-5 py-4 h-full flex flex-col gap-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Restricted class is weaker</p>
              <div className="flex flex-col gap-1">
                <Latex block>{"\\Psi(\\cdot) \\subseteq \\Psi^{\\mathrm{res}}_{\\mathcal{S}_\\mathrm{a},\\, \\mathcal{T}_\\mathrm{a}}(\\cdot)"}</Latex>
                <Latex block>{"[G]_\\Psi \\subseteq [G]_{\\Psi^{\\mathrm{res}}}"}</Latex>
              </div>
            </div>
          </Anim>

          <Anim delay={1400} animation="animate-in fade-in slide-in-from-bottom-4 duration-500" className="flex-1">
            <div className="rounded-2xl border bg-card shadow-sm px-5 py-4 h-full flex flex-col gap-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Orientation Rules</p>
              <p className="text-xl text-foreground">3 orientation rules sound w.r.t. the restricted Ψ-equivalence class</p>
            </div>
          </Anim>
        </div>

      </div>
    </div>
  );
}
