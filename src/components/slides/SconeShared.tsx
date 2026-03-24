import { useEffect, useState } from "react";
import katex from "katex";
export { Anim } from "./slide-shared";

/* ------------------------------------------------------------------ */
/*  LaTeX math renderer                                                */
/* ------------------------------------------------------------------ */
export function Latex({ children, block = false }: { children: string; block?: boolean }) {
  const html = katex.renderToString(children, {
    throwOnError: false,
    displayMode: block,
  });
  return block
    ? <div dangerouslySetInnerHTML={{ __html: html }} />
    : <span dangerouslySetInnerHTML={{ __html: html }} />;
}

/* ------------------------------------------------------------------ */
/*  Shared graph: A→B, B→E, C→D, C→E, D→E, E→F  (vertical layout)  */
/* ------------------------------------------------------------------ */
export const GRAPH_W = 360;
export const GRAPH_H = 400;

// Node positions — vertical so collider E has clean, spread-out edges
export const GRAPH_POS: Record<string, { x: number; y: number }> = {
  A: { x: 100, y: 60  },
  B: { x: 100, y: 200 },
  C: { x: 260, y: 60  },
  D: { x: 260, y: 200 },
  E: { x: 180, y: 340 },
};

export const GRAPH_EDGE_DEFS = [
  { from: "A", to: "B" },
  { from: "B", to: "E" },
  { from: "C", to: "D" },
  { from: "D", to: "E" },
];

/* ------------------------------------------------------------------ */
/*  Reusable DAG graph component                                       */
/* ------------------------------------------------------------------ */
const R = 26;

type NodeColor = "blue" | "violet" | "green" | "orange" | "red" | "default";

const COLORS: Record<NodeColor, { fill: string; stroke: string; text: string }> = {
  blue:    { fill: "#C3D5D1", stroke: "#7aada7", text: "#1a4a44" },
  violet:  { fill: "#D0B3B8", stroke: "#a87e87", text: "#5a2535" },
  green:   { fill: "#D7EAD8", stroke: "#9ab99c", text: "#2d5a3a" },
  orange:  { fill: "#FFC09F", stroke: "#c17a50", text: "#5a2a0a" },
  red:     { fill: "#e8c8cc", stroke: "#b87a84", text: "#6b2535" },
  default: { fill: "#f8fafc", stroke: "#94a3b8", text: "#475569" },
};

// Shared palette — import in any slide to use consistent colors
export const PAL = {
  green:  { bg: "#D7EAD8", border: "#9ab99c", dot: "#4a7a55", text: "#2d5a3a" },
  teal:   { bg: "#C3D5D1", border: "#7aada7", dot: "#2e6b63", text: "#1a4a44" },
  mauve:  { bg: "#D0B3B8", border: "#a87e87", dot: "#7a3a48", text: "#5a2535" },
  peach:  { bg: "#F8E4DD", border: "#d4b5aa", dot: "#8b5e4e", text: "#5a3428" },
  orange: { bg: "#FFC09F", border: "#c17a50", dot: "#b86b3a", text: "#5a2a0a" },
  rose:   { bg: "#e8c8cc", border: "#b87a84", dot: "#a05060", text: "#6b2535" },
};

export type DagNode = {
  id: string;
  x: number;
  y: number;
  label?: string;
  color?: NodeColor;
  step?: number;
  /** Render node border as dashed stroke */
  dashed?: boolean;
};

export type DagEdge = {
  from: string;
  to: string;
  step?: number;
  color?: "blue" | "violet" | "orange" | "red" | "default" | "dashed";
  bidirectional?: boolean;
  /** Undirected edge — no arrowheads on either end */
  undirected?: boolean;
  /** Render as dashed stroke (can combine with any color) */
  dashed?: boolean;
};

export function DagGraph({
  nodes,
  edges,
  width = 400,
  height = 280,
  viewBoxW,
  viewBoxH,
  stepDelay = 200,
  startStep = 0,
}: {
  nodes: DagNode[];
  edges: DagEdge[];
  width?: number;
  height?: number;
  /** Logical coordinate space — defaults to width/height. Set to the
   *  original dimensions to render a scaled-down version of the graph. */
  viewBoxW?: number;
  viewBoxH?: number;
  stepDelay?: number;
  startStep?: number;
}) {
  const maxStep = Math.max(
    ...nodes.map((n) => n.step ?? 0),
    ...edges.map((e) => e.step ?? 0),
    0
  );
  const [step, setStep] = useState(startStep);

  useEffect(() => {
    if (step >= maxStep) return;
    const t = setTimeout(() => setStep((s) => s + 1), stepDelay);
    return () => clearTimeout(t);
  }, [step, maxStep, stepDelay]);

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  const vbW = viewBoxW ?? width;
  const vbH = viewBoxH ?? height;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${vbW} ${vbH}`}
      style={{ overflow: "visible" }}
    >
      <defs>
        {(["default", "blue", "violet", "orange", "red"] as const).map((c) => (
          <marker
            key={c}
            id={`scone-arrow-${c}`}
            markerWidth="10"
            markerHeight="10"
            refX="6"
            refY="4"
            orient="auto"
          >
            <path
              d="M0,0 L0,8 L10,4 z"
              fill={
                c === "blue"   ? "#7aada7"
                : c === "violet" ? "#a87e87"
                : c === "orange" ? "#c17a50"
                : c === "red"    ? "#b87a84"
                : "#94a3b8"
              }
            />
          </marker>
        ))}
      </defs>

      {/* Edges */}
      {edges.map((edge) => {
        const from = byId[edge.from];
        const to = byId[edge.to];
        if (!from || !to) return null;
        const visible = step >= (edge.step ?? 0);
        const edgeKey = `${edge.from}-${edge.to}`;
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const strokeColor =
          edge.color === "blue"    ? "#7aada7"
          : edge.color === "violet"  ? "#a87e87"
          : edge.color === "orange"  ? "#c17a50"
          : edge.color === "red"     ? "#b87a84"
          : "#cbd5e1";
        const markerColor =
          edge.color === "blue"    ? "blue"
          : edge.color === "violet"  ? "violet"
          : edge.color === "orange"  ? "orange"
          : edge.color === "red"     ? "red"
          : "default";
        const markerId = `url(#scone-arrow-${markerColor})`;
        const isDashed = edge.dashed || edge.color === "dashed";
        return (
          <line
            key={edgeKey}
            x1={from.x + (dx / len) * (R + 1)}
            y1={from.y + (dy / len) * (R + 1)}
            x2={to.x - (dx / len) * (R + 8)}
            y2={to.y - (dy / len) * (R + 8)}
            stroke={strokeColor}
            strokeWidth={["blue","violet","orange","red"].includes(edge.color ?? "") ? 3 : 2.5}
            strokeDasharray={isDashed ? "6,4" : undefined}
            markerEnd={edge.undirected ? undefined : markerId}
            markerStart={edge.bidirectional ? markerId : undefined}
            opacity={visible ? 1 : 0}
            style={{ transition: "opacity 0.35s ease" }}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => {
        const colors = COLORS[node.color ?? "default"];
        const visible = step >= (node.step ?? 0);
        return (
          <g
            key={node.id}
            opacity={visible ? 1 : 0}
            style={{ transition: "opacity 0.4s ease" }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={R}
              fill={colors.fill}
              stroke={colors.stroke}
              strokeWidth={node.dashed ? 2 : 1.5}
              strokeDasharray={node.dashed ? "5,3" : undefined}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill={colors.text}
              fontSize={18}
              fontWeight={600}
              fontFamily="DM Sans Variable, sans-serif"
            >
              {node.label ?? node.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
