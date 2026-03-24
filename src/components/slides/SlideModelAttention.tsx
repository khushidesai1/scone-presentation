import React from "react";
import { Anim } from "./slide-shared";
import { Latex } from "./SconeShared";

/* ------------------------------------------------------------------ */
/*  Axial Attention Grid SVG                                           */
/* ------------------------------------------------------------------ */

const ROWS = 5;   // T subsets
const COLS = 6;   // K edges
const CELL_W = 36;
const CELL_H = 30;
const PAD_LEFT = 40;
const PAD_TOP = 12;
const HIGHLIGHTED_ROW = 2;
const HIGHLIGHTED_COL = 3;

function AxialGrid() {
  const svgW = PAD_LEFT + COLS * CELL_W + 8;
  const svgH = PAD_TOP + ROWS * CELL_H + 28;

  const cells: React.ReactElement[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x = PAD_LEFT + c * CELL_W;
      const y = PAD_TOP + r * CELL_H;
      const isHighRow = r === HIGHLIGHTED_ROW;
      const isHighCol = c === HIGHLIGHTED_COL;

      let fill = "white";
      let stroke = "#e2e8f0";
      let strokeWidth = 1;

      if (isHighRow && isHighCol) {
        fill = "#b8cdc9";
        stroke = "#7aada7";
        strokeWidth = 1.5;
      } else if (isHighRow) {
        fill = "#C3D5D166";
        stroke = "#7aada7";
        strokeWidth = 1.5;
      } else if (isHighCol) {
        fill = "#D0B3B866";
        stroke = "#a87e87";
        strokeWidth = 1.5;
      }

      cells.push(
        <rect
          key={`${r}-${c}`}
          x={x} y={y}
          width={CELL_W - 2} height={CELL_H - 2}
          rx={4}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      );
    }
  }

  return (
    <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`}>
      <text
        x={12}
        y={PAD_TOP + (ROWS * CELL_H) / 2}
        textAnchor="middle"
        fontSize={12}
        fill="#64748b"
        fontFamily="DM Sans Variable, sans-serif"
        transform={`rotate(-90, 12, ${PAD_TOP + (ROWS * CELL_H) / 2})`}
      >
        T (subsets)
      </text>
      {cells}
      <text
        x={PAD_LEFT + (COLS * CELL_W) / 2}
        y={svgH - 4}
        textAnchor="middle"
        fontSize={12}
        fill="#64748b"
        fontFamily="DM Sans Variable, sans-serif"
      >
        K (edges)
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Slide                                                              */
/* ------------------------------------------------------------------ */
export function SlideModelAttention() {
  return (
    <div className="slide-font h-dvh w-full flex flex-col px-8 pt-8 pb-4 bg-background overflow-hidden">
      {/* Header */}
      <div className="shrink-0 mb-4">
        <Anim delay={0} animation="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight">Attention &amp; Bias Heads</h1>
        </Anim>
      </div>

      <div className="flex-1 flex flex-col gap-5 min-h-0">

        {/* Top row: Axial Attention grid + message passing */}
        <div className="flex gap-6 items-start">
          <Anim delay={200} animation="animate-in fade-in slide-in-from-left-6 duration-600">
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Axial Attention</p>
              <AxialGrid />
              <div className="flex gap-5 text-sm">
                <div className="flex items-center gap-1.5">
                  <div className="size-3.5 rounded-sm" style={{ background: "#C3D5D166", border: "1.5px solid #7aada7" }} />
                  <span className="text-muted-foreground">K-axis (same edge, all subsets)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="size-3.5 rounded-sm" style={{ background: "#D0B3B866", border: "1.5px solid #a87e87" }} />
                  <span className="text-muted-foreground">T-axis (same subset, all edges)</span>
                </div>
              </div>
            </div>
          </Anim>

          <Anim delay={400} animation="animate-in fade-in duration-500" className="flex-1">
            <div className="flex flex-col gap-4 pt-2">
              <p className="text-xl text-foreground">Each block: axial attention → feedforward + residual (pre-LN)</p>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-start">
                  <span className="shrink-0 text-lg font-bold" style={{ color: "#7aada7" }}>→</span>
                  <p className="text-xl text-foreground">
                    <span className="font-semibold">Edge → Global:</span> pool edge embeddings → scatter into <Latex>{"H_\\rho[i,j]"}</Latex>
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="shrink-0 text-lg font-bold" style={{ color: "#a87e87" }}>→</span>
                  <p className="text-xl text-foreground">
                    <span className="font-semibold">Global → Edge:</span> <Latex>{"H_\\rho[i,j]"}</Latex> broadcast back to <Latex>{"H_E[t,e]"}</Latex>
                  </p>
                </div>
              </div>
            </div>
          </Anim>
        </div>

        {/* Bottom: three bias heads in a row */}
        <Anim delay={600} animation="animate-in fade-in slide-in-from-bottom-4 duration-600">
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">Bias Heads</p>
          <div className="flex gap-4">

            {/* SSI */}
            <div className="flex-1 rounded-2xl px-5 py-4 flex flex-col gap-2"
              style={{ background: "#C3D5D122", border: "1.5px solid #7aada7" }}>
              <p className="text-lg font-bold" style={{ color: "#1a4a44" }}>SSI</p>
              <p className="text-lg text-foreground">Orients i→j when j's mechanism changes more than i's</p>
              <div className="rounded-lg px-3 py-1.5" style={{ background: "#f1f5f9" }}>
                <Latex block>{String.raw`b^{\mathrm{SSI}}(i\to j) \mathrel{+}= \kappa\cdot\mathrm{clip}(\delta_j - \delta_i,\; -\tau,\; \tau)^+`}</Latex>
              </div>
              <div className="rounded-lg px-3 py-1.5" style={{ background: "#f1f5f9" }}>
                <Latex block>{String.raw`b^{\mathrm{SSI}}(j \to i) -= \kappa \cdot \operatorname{clip}(\delta_j - \delta_i,\; -\tau,\; \tau)^{+}`}</Latex>
              </div>
            </div>

            {/* CVT */}
            <div className="flex-1 rounded-2xl px-5 py-4 flex flex-col gap-2"
              style={{ background: "#D0B3B822", border: "1.5px solid #a87e87" }}>
              <p className="text-lg font-bold" style={{ color: "#5a2535" }}>CVT</p>
              <p className="text-lg text-foreground">Scores collider i→j←k using regime-contrast embeddings</p>
              <div className="rounded-lg px-3 py-1.5" style={{ background: "#f1f5f9" }}>
                <Latex block>{String.raw`s_{\mathrm{vstr}}(i{\to}j{\leftarrow}k) = \sigma\!\left(u^\top[z_{\Delta,ij} \| z_{\Delta,kj}]\right)`}</Latex>
              </div>
            </div>

            {/* DPT */}
            <div className="flex-1 rounded-2xl px-5 py-4 flex flex-col gap-2"
              style={{ background: "#FFC09F33", border: "1.5px solid #c17a50" }}>
              <p className="text-lg font-bold" style={{ color: "#5a2a0a" }}>DPT</p>
              <p className="text-lg text-foreground">Top-B BFS paths scored per regime via DeepSets</p>
              <div className="rounded-lg px-3 py-1.5" style={{ background: "#f1f5f9" }}>
                <Latex block>{String.raw`s_\pi^{(c)} = \sigma\!\left(\mathrm{DeepSet}\!\left(\left\{[\tilde{H}_E[t,e_r,c,:] \| \Delta_{e_r}]\right\}_{r=0}^{m}\right)\right)`}</Latex>
              </div>
            </div>

          </div>
        </Anim>

      </div>
    </div>
  );
}
