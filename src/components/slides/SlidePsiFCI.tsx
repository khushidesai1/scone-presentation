import { Anim } from "./slide-shared";
import { Latex } from "./SconeShared";

const TOP_CARDS = [
  {
    badge: "Ψ-Markov",
    badgeStyle: { background: "#D0B3B8", color: "#5a2535", borderColor: "#a87e87" },
    points: [
      "Generalizes Markov to soft interventions with unknown targets",
      "Defines graph equivalence across environments",
    ],
    delay: 300,
  },
  {
    badge: "Ψ-FCI",
    badgeStyle: { background: "#C3D5D1", color: "#1a4a44", borderColor: "#7aada7" },
    points: [
      "Provably recovers the causal graph up to the Ψ-MEC",
      "Outputs a PAG — handles hidden confounders",
    ],
    delay: 700,
  },
];

const LIMITATIONS = [
  "Recursive search — exponential in graph size",
  "Requires exact independence test answers per environment",
  "Must know which mechanisms change across environments",
];

function InvarianceViz() {
  const r = 28;
  const W = 340;
  const H = 150;

  const nodes = [
    { id: "A", cx: 60,  cy: 72, inv: true  },
    { id: "B", cx: 170, cy: 72, inv: false },
    { id: "C", cx: 280, cy: 72, inv: true  },
  ];
  const edges = [
    { x1: 89,  y1: 72, x2: 141, y2: 72 },
    { x1: 199, y1: 72, x2: 251, y2: 72 },
  ];

  const invFill = "#f8fafc"; const invStroke = "#94a3b8"; const invText = "#475569";
  const intFill = "#FFC09F"; const intStroke = "#c17a50"; const intText = "#5a2a0a";

  return (
    <div className="flex justify-center">
      <div className="px-6 py-4 flex flex-col items-center gap-3" style={{ minWidth: 760 }}>
        <div className="flex items-center gap-6">
          {/* Env i */}
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#7aada7" }}>Environment <em>i</em></p>
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
              <defs>
                <marker id="arri" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="#999" />
                </marker>
              </defs>
              {edges.map((e, i) => (
                <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="#999" strokeWidth={2} markerEnd="url(#arri)" />
              ))}
              {nodes.map((n) => (
                <g key={n.id}>
                  <circle cx={n.cx} cy={n.cy} r={r}
                    fill={n.inv ? invFill : intFill}
                    stroke={n.inv ? invStroke : intStroke}
                    strokeWidth={2.5}
                    strokeDasharray={n.inv ? undefined : "6,3"}
                  />
                  <text x={n.cx} y={n.cy + 6} textAnchor="middle" fontSize={18} fontWeight={700}
                    fill={n.inv ? invText : intText}>{n.id}</text>
                </g>
              ))}
              <text x={170} y={128} textAnchor="middle" fontSize={14} fill={intStroke} fontWeight={600}>B: intervened</text>
            </svg>
          </div>

          {/* Middle: condition */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div className="rounded-xl bg-muted/50 border px-5 py-3 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">Invariance</p>
              <Latex block>{"P_i(v \\mid \\mathrm{Pa}(v)) = P_j(v \\mid \\mathrm{Pa}(v))"}</Latex>
              <p className="text-lg font-semibold text-foreground mt-2">v ∈ &#123;A, C&#125;</p>
            </div>
          </div>

          {/* Env j */}
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#a87e87" }}>Environment <em>j</em></p>
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
              <defs>
                <marker id="arrj" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="#999" />
                </marker>
              </defs>
              {edges.map((e, i) => (
                <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="#999" strokeWidth={2} markerEnd="url(#arrj)" />
              ))}
              {nodes.map((n) => (
                <g key={n.id}>
                  <circle cx={n.cx} cy={n.cy} r={r}
                    fill={invFill}
                    stroke={invStroke}
                    strokeWidth={2.5}
                  />
                  <text x={n.cx} y={n.cy + 6} textAnchor="middle" fontSize={18} fontWeight={700} fill={invText}>{n.id}</text>
                </g>
              ))}
              <text x={170} y={128} textAnchor="middle" fontSize={14} fill="#999" fontWeight={600}>B: unchanged</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SlidePsiFCI() {
  return (
    <div className="slide-font h-dvh w-full flex flex-col px-8 pt-8 pb-4 bg-background overflow-hidden">
      {/* Header */}
      <div className="shrink-0 mb-3">
        <Anim delay={0} animation="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight">Ψ-Markov and Ψ-FCI</h1>
        </Anim>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-4 min-h-0">
        {/* Invariance visualization */}
        <Anim delay={100} animation="animate-in fade-in duration-600">
          <InvarianceViz />
        </Anim>

        {/* Two definition cards side by side */}
        <div className="flex gap-4">
          {TOP_CARDS.map((section) => (
            <Anim key={section.badge} delay={section.delay} animation="animate-in fade-in slide-in-from-top-4 duration-600" className="flex-1">
              <div className="rounded-2xl border bg-card shadow-sm p-5">
                {/* Badge title */}
                <div
                  className="inline-flex items-center px-4 py-1.5 rounded-xl border mb-4 font-bold text-xl tracking-tight"
                  style={{
                    background: section.badgeStyle.background,
                    color: section.badgeStyle.color,
                    borderColor: section.badgeStyle.borderColor,
                  }}
                >
                  {section.badge}
                </div>
                <div className="flex flex-col gap-3">
                  {section.points.map((pt, i) => (
                    <div key={i} className="flex gap-2.5 items-start">
                      <div className="mt-2.5 size-2.5 rounded-full bg-foreground/30 shrink-0" />
                      <p className="text-xl text-foreground">{pt}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Anim>
          ))}
        </div>

        {/* Limitations below */}
        <Anim delay={1100} animation="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="rounded-2xl border bg-card shadow-sm p-5">
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">Limitations</p>
            <div className="flex flex-col gap-3">
              {LIMITATIONS.map((lim, i) => (
                <Anim key={i} delay={1200 + i * 120} animation="animate-in fade-in slide-in-from-left-2 duration-400">
                  <div className="flex gap-2.5 items-start">
                    <div className="mt-2.5 size-2.5 rounded-full shrink-0" style={{ background: "#b86b3a" }} />
                    <p className="text-xl text-foreground">{lim}</p>
                  </div>
                </Anim>
              ))}
            </div>
          </div>
        </Anim>
      </div>
    </div>
  );
}
