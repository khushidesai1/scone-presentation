import { useState } from "react";
import { X, GitBranch } from "lucide-react";
import { Anim } from "./slide-shared";
import { Latex } from "./SconeShared";

const DEFAULT = { fill: "#f8fafc", stroke: "#94a3b8", text: "#475569" };
const ORANGE  = { fill: "#FFC09F", stroke: "#c17a50", text: "#5a2a0a" };
const ENV     = { fill: "#f3f4f6", stroke: "#6b7280", text: "#374151" };

const R = 24;

function Node({ x, y, label, color, dashed }: {
  x: number; y: number; label: string;
  color: typeof DEFAULT; dashed?: boolean;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r={R}
        fill={color.fill} stroke={color.stroke}
        strokeWidth={2} strokeDasharray={dashed ? "6,3" : undefined}
      />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central"
        fill={color.text} fontSize={16} fontWeight={700}>{label}</text>
    </g>
  );
}

function EnvNode({ x, y, label }: { x: number; y: number; label: string }) {
  const s = R + 4;
  return (
    <g>
      <rect x={x - s} y={y - s} width={s * 2} height={s * 2} rx={6}
        fill={ENV.fill} stroke={ENV.stroke} strokeWidth={2} strokeDasharray="5,3" />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central"
        fill={ENV.text} fontSize={16} fontWeight={700}>{label}</text>
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, id, stroke, dashed }: {
  x1: number; y1: number; x2: number; y2: number;
  id: string; stroke: string; dashed?: boolean;
}) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = dx / len, ny = dy / len;
  return (
    <>
      <defs>
        <marker id={id} markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0,0 L0,9 L9,4.5 z" fill={stroke} />
        </marker>
      </defs>
      <line
        x1={x1 + nx * (R + 1)} y1={y1 + ny * (R + 1)}
        x2={x2 - nx * (R + 9)} y2={y2 - ny * (R + 9)}
        stroke={stroke} strokeWidth={2}
        strokeDasharray={dashed ? "7,4" : undefined}
        markerEnd={`url(#${id})`}
      />
    </>
  );
}

function Line({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = dx / len, ny = dy / len;
  return (
    <line
      x1={x1 + nx * (R + 1)} y1={y1 + ny * (R + 1)}
      x2={x2 - nx * (R + 1)} y2={y2 - ny * (R + 1)}
      stroke="#94a3b8" strokeWidth={2}
    />
  );
}

// Triangle: k top, i bottom-left, j bottom-right
const W = 220, H = 190;
const kX = 110, kY = 30;
const iX = 30,  iY = 160;
const jX = 190, jY = 160;

// Augmented panel: k, i, j triangle + C env node
const AW = 310, AH = 205;
const akX = 115, akY = 30;
const aiX = 40,  aiY = 172;
const ajX = 190, ajY = 172;
const CX  = 265, CY  = 90;

function Panel0() {
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <Arrow x1={kX} y1={kY} x2={iX} y2={iY} id="p0-ki" stroke="#94a3b8" />
      <Arrow x1={kX} y1={kY} x2={jX} y2={jY} id="p0-kj" stroke="#94a3b8" />
      <Line  x1={iX} y1={iY} x2={jX} y2={jY} />
      <Node x={kX} y={kY} label="k" color={DEFAULT} />
      <Node x={iX} y={iY} label="i" color={DEFAULT} />
      <Node x={jX} y={jY} label="j" color={DEFAULT} />
    </svg>
  );
}

function Panel1() {
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <Arrow x1={kX} y1={kY} x2={iX} y2={iY} id="p1-ki" stroke="#94a3b8" />
      <Arrow x1={kX} y1={kY} x2={jX} y2={jY} id="p1-kj" stroke="#c17a50" dashed />
      <Line  x1={iX} y1={iY} x2={jX} y2={jY} />
      <Node x={kX} y={kY} label="k" color={DEFAULT} />
      <Node x={iX} y={iY} label="i" color={DEFAULT} />
      <Node x={jX} y={jY} label="j" color={ORANGE} dashed />
    </svg>
  );
}

function PanelInferred() {
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <Arrow x1={kX} y1={kY} x2={iX} y2={iY} id="inf-ki" stroke="#94a3b8" />
      <Arrow x1={kX} y1={kY} x2={jX} y2={jY} id="inf-kj" stroke="#94a3b8" />
      <Arrow x1={iX} y1={iY} x2={jX} y2={jY} id="inf-ij" stroke="#94a3b8" />
      <Node x={kX} y={kY} label="k" color={DEFAULT} />
      <Node x={iX} y={iY} label="i" color={DEFAULT} />
      <Node x={jX} y={jY} label="j" color={DEFAULT} />
    </svg>
  );
}

function PanelAugmented() {
  return (
    <svg width={248} height={164} viewBox={`0 0 ${AW} ${AH}`} style={{ overflow: "visible" }}>
      <Arrow x1={akX} y1={akY} x2={aiX} y2={aiY} id="aug-ki" stroke="#94a3b8" />
      <Arrow x1={akX} y1={akY} x2={ajX} y2={ajY} id="aug-kj" stroke="#94a3b8" />
      <Arrow x1={aiX} y1={aiY} x2={ajX} y2={ajY} id="aug-ij" stroke="#94a3b8" />
      <Arrow x1={CX}  y1={CY}  x2={ajX} y2={ajY} id="aug-cj" stroke="#6b7280" />
      <Node x={akX} y={akY} label="k" color={DEFAULT} />
      <Node x={aiX} y={aiY} label="i" color={DEFAULT} />
      <Node x={ajX} y={ajY} label="j" color={ORANGE} dashed />
      <EnvNode x={CX} y={CY} label="C" />
    </svg>
  );
}

// Small inline SVG for CVT: A and C above, B below (v-structure)
function CVTViz() {
  const r = 26, W = 260, H = 155;
  const ax = 50, ay = 32, cx2 = 210, cy2 = 32, bx = 130, by = 122;
  const arr = (id: string, x1: number, y1: number, x2: number, y2: number) => {
    const dx=x2-x1,dy=y2-y1,len=Math.sqrt(dx*dx+dy*dy),nx=dx/len,ny=dy/len;
    return (
      <>
        <defs><marker id={id} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#94a3b8" /></marker></defs>
        <line x1={x1+nx*(r+1)} y1={y1+ny*(r+1)} x2={x2-nx*(r+8)} y2={y2-ny*(r+8)} stroke="#94a3b8" strokeWidth={2} markerEnd={`url(#${id})`} />
      </>
    );
  };
  const node = (x: number, y: number, label: string, orange?: boolean) => (
    <g>
      <circle cx={x} cy={y} r={r} fill={orange ? "#FFC09F" : "#f8fafc"} stroke={orange ? "#c17a50" : "#94a3b8"} strokeWidth={2} />
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize={15} fontWeight={700} fill={orange ? "#5a2a0a" : "#475569"}>{label}</text>
    </g>
  );
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {arr("cvt-ab", ax, ay, bx, by)}
      {arr("cvt-cb", cx2, cy2, bx, by)}
      {node(ax, ay, "A")}
      {node(cx2, cy2, "C")}
      {node(bx, by, "B", true)}
    </svg>
  );
}

// Small inline SVG for DPT: X→A→B-C discriminating path (spaced out)
function DPTViz() {
  const r = 26;
  const xX=28, xA=125, xB=220, xC=310, y=55;
  const nodes = [{x:xX,y,l:"X"},{x:xA,y,l:"A"},{x:xB,y,l:"B",o:true},{x:xC,y,l:"C"}];
  const arr = (id: string, x1: number, y1: number, x2: number, y2: number) => {
    const dx=x2-x1,dy=y2-y1,len=Math.sqrt(dx*dx+dy*dy),nx=dx/len,ny=dy/len;
    return (
      <>
        <defs><marker id={id} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4 z" fill="#94a3b8" /></marker></defs>
        <line x1={x1+nx*(r+1)} y1={y1+ny*(r+1)} x2={x2-nx*(r+8)} y2={y2-ny*(r+8)} stroke="#94a3b8" strokeWidth={2} markerEnd={`url(#${id})`} />
      </>
    );
  };
  return (
    <svg width={370} height={120} viewBox="-10 -28 380 128" style={{overflow:"visible"}}>
      {arr("dpt-xa", xX, y, xA, y)}
      {arr("dpt-ab", xA, y, xB, y)}
      <line x1={xB+r+1} y1={y} x2={xC-r-1} y2={y} stroke="#94a3b8" strokeWidth={2} />
      {nodes.map(n => (
        <g key={n.l}>
          <circle cx={n.x} cy={n.y} r={r} fill={n.o ? "#FFC09F" : "#f8fafc"} stroke={n.o ? "#c17a50" : "#94a3b8"} strokeWidth={2} />
          <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="central" fontSize={15} fontWeight={700} fill={n.o ? "#5a2a0a" : "#475569"}>{n.l}</text>
        </g>
      ))}
      <path d={`M ${xX} ${y-r-3} Q ${(xX+xC)/2} ${-10} ${xC} ${y-r-3}`} fill="none" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4,3" />
    </svg>
  );
}

export function SlideSSI() {
  const [open, setOpen] = useState(false);

  return (
    <div className="slide-font h-dvh w-full flex flex-col px-8 pt-8 pb-4 bg-background overflow-hidden relative">
      {/* Header + overlay trigger */}
      <div className="shrink-0 mb-4 flex items-center justify-between">
        <Anim delay={0} animation="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight">Single Sided Invariance</h1>
        </Anim>
        <Anim delay={600} animation="animate-in fade-in duration-500">
          <button
            onClick={() => setOpen(true)}
            className="rounded-xl px-5 py-2.5 flex items-center gap-3 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            style={{ background: "#C3D5D133", border: "1.5px solid #7aada7" }}
          >
            <div className="size-8 rounded-lg flex items-center justify-center" style={{ background: "#7aada7", color: "#fff" }}>
              <GitBranch className="size-4" />
            </div>
            <span className="text-base font-semibold" style={{ color: "#1a4a44" }}>V-structures &amp; discriminating paths →</span>
          </button>
        </Anim>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-4 min-h-0">

        {/* Intuition — at top */}
        <Anim delay={200} animation="animate-in fade-in duration-500">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">Intuition</p>
            <p className="text-xl text-foreground leading-relaxed">
              If the edge were <strong>j → i</strong>, any active connection from C to j would extend through j → i,
              making i C-connected — contradicting <Latex>{String.raw`\mathrm{Inv}(i \mid Z) = 1`}</Latex>.
            </p>
          </div>
        </Anim>

        {/* Main visualization */}
        <Anim delay={400} animation="animate-in fade-in duration-600">
          <div className="flex items-center justify-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <p className="text-lg font-semibold text-foreground">(0)</p>
              <Panel0 />
              <p className="text-lg text-muted-foreground">i—j undirected</p>
            </div>

            <div className="w-px h-44 bg-border shrink-0" />

            <div className="flex flex-col items-center gap-1">
              <p className="text-lg font-semibold text-foreground">(1)</p>
              <Panel1 />
              <p className="text-lg font-medium" style={{ color: "#c17a50" }}>j changes, i invariant</p>
            </div>

            <div className="text-3xl text-muted-foreground shrink-0">⟹</div>

            <div className="flex flex-col items-center gap-1">
              <p className="text-lg font-semibold text-foreground">Inferred graph</p>
              <PanelInferred />
              <p className="text-lg font-semibold" style={{ color: "#475569" }}>i → j oriented</p>
            </div>

            <div className="w-px h-44 bg-border shrink-0" />

            <div className="flex flex-col items-center gap-1">
              <p className="text-lg font-semibold text-foreground">Augmented</p>
              <PanelAugmented />
              <p className="text-lg text-muted-foreground">C → j</p>
            </div>
          </div>
        </Anim>

        {/* Orientation condition — bubble with label */}
        <Anim delay={700} animation="animate-in fade-in slide-in-from-bottom-4 duration-600">
          <div className="flex justify-center">
            <div className="rounded-2xl px-8 py-4 flex flex-col items-center gap-2" style={{ background: "#f8fafc", border: "1.5px solid #94a3b8" }}>
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Orientation condition</p>
              <div className="flex items-center gap-5">
                <Latex>{String.raw`\mathrm{Chg}(j \mid Z) = 1`}</Latex>
                <span className="text-lg text-muted-foreground font-light">&amp;</span>
                <Latex>{String.raw`\mathrm{Inv}(i \mid Z) = 1`}</Latex>
                <span className="text-xl text-muted-foreground">⟹</span>
                <span className="font-semibold text-lg" style={{ color: "#475569" }}>i → j</span>
              </div>
            </div>
          </div>
        </Anim>

      </div>

      {/* Slide-up overlay */}
      <div
        className="absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-x shadow-2xl bg-background z-50 flex flex-col"
        style={{
          transform: open ? "translateY(0%)" : "translateY(105%)",
          transition: "transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
          height: "54%",
        }}
      >
        <div className="flex items-center justify-between px-8 pt-5 pb-3 shrink-0 border-b">
          <h2 className="text-2xl font-bold">Orientation rules for other structures</h2>
          <button
            onClick={() => setOpen(false)}
            className="size-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex-1 flex gap-5 px-8 pb-6 pt-2 min-h-0">
          {/* CVT */}
          <div className="flex-1 rounded-2xl border p-5 flex flex-col gap-3" style={{ background: "#C3D5D122", borderColor: "#7aada7" }}>
            <p className="text-lg font-bold" style={{ color: "#1a4a44" }}>CVT — Contrastive V-structure</p>
            <div className="flex-1 flex items-center justify-center">
              <CVTViz />
            </div>
          </div>
          {/* DPT */}
          <div className="flex-1 rounded-2xl border p-5 flex flex-col gap-3" style={{ background: "#D0B3B822", borderColor: "#a87e87" }}>
            <p className="text-lg font-bold" style={{ color: "#5a2535" }}>DPT — Contrastive Discriminating Path</p>
            <div className="flex-1 flex items-center justify-center">
              <DPTViz />
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="absolute inset-0 bg-black/15 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}
