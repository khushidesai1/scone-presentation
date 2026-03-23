import { useState, useEffect } from "react";
import { Search, Loader2, Check, MessageSquare } from "lucide-react";
import { Anim } from "./slide-shared";

/* ------------------------------------------------------------------ */
/*  Inline data                                                        */
/* ------------------------------------------------------------------ */
const SEARCH_QUERY = "Non-compete agreements signed in Texas";

const SOURCES = [
  { letter: "i", color: "#0066CC", name: "iManage", desc: "Document management", docs: "1.2M docs" },
  { letter: "S", color: "#038387", name: "SharePoint", desc: "Internal resources", docs: "340K files" },
  { letter: "O", color: "#0078D4", name: "Outlook", desc: "Email & calendar", docs: "890K items" },
  { letter: "N", color: "#4B0082", name: "NetDocuments", desc: "Cloud documents", docs: "520K docs" },
];

const SUGGESTIONS = [
  "Recent client agreements",
  "Partner billing summaries",
  "Employment law memos",
  "Upcoming filing deadlines",
];

const RESULTS = [
  {
    letter: "i",
    color: "#0066CC",
    title: "Non-Compete Clause — Standard Template",
    snippet: "Firm-wide template for non-competition covenants...",
    source: "iManage",
    type: "Template",
    date: "2 weeks ago",
  },
  {
    letter: "i",
    color: "#0066CC",
    title: "Employment Agreement — J. Martinez 2024",
    snippet: "Executive employment agreement with 24-month non-compete...",
    source: "iManage",
    type: "Contract",
    date: "3 months ago",
  },
  {
    letter: "W",
    color: "#CC0000",
    title: "Tex. Bus. & Com. Code § 15.50",
    snippet: "Texas statute governing enforceability of covenants not to compete...",
    source: "Westlaw",
    type: "Statute",
    date: "Current",
  },
  {
    letter: "O",
    color: "#0078D4",
    title: "RE: Martinez Non-Compete — Enforceability Analysis",
    snippet: "Partner email thread discussing California enforceability concerns...",
    source: "Outlook",
    type: "Email",
    date: "2 weeks ago",
  },
  {
    letter: "W",
    color: "#CC0000",
    title: "FTC Non-Compete Ban — Final Rule Analysis",
    snippet: "Analysis of FTC's final rule banning non-compete clauses...",
    source: "Westlaw",
    type: "Memo",
    date: "Updated 1 month ago",
  },
  {
    letter: "S",
    color: "#038387",
    title: "Associate Training — Non-Compete Enforceability Guide",
    snippet: "50-state survey of non-compete enforceability standards...",
    source: "SharePoint",
    type: "Memo",
    date: "1 month ago",
  },
];

const PREVIEW_META = [
  { key: "Document ID", value: "IM-TPL-2024-0047" },
  { key: "Created", value: "January 12, 2024" },
  { key: "Last Modified", value: "March 8, 2026" },
  { key: "Author", value: "Sarah Chen" },
  { key: "Practice Group", value: "Employment & Labor" },
];

const PREVIEW_CLAUSES = [
  "Non-solicitation of clients (§ 3.1)",
  "Non-solicitation of employees (§ 3.2)",
  "Geographic scope limitations (§ 4)",
  "Duration: configurable, default 18 months (§ 5)",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export function SlideSearch() {
  const [phase, setPhase] = useState<"idle" | "typing" | "searching" | "done">("idle");
  const [typed, setTyped] = useState("");

  /* Phase transitions */
  useEffect(() => {
    const t = setTimeout(() => setPhase("typing"), 2000);
    return () => clearTimeout(t);
  }, []);

  /* Typewriter effect */
  useEffect(() => {
    if (phase !== "typing") return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(SEARCH_QUERY.slice(0, i));
      if (i >= SEARCH_QUERY.length) {
        clearInterval(iv);
        setPhase("searching");
      }
    }, 30);
    return () => clearInterval(iv);
  }, [phase]);

  /* Searching → done */
  useEffect(() => {
    if (phase !== "searching") return;
    const t = setTimeout(() => setPhase("done"), 1000);
    return () => clearTimeout(t);
  }, [phase]);

  const showSources = phase === "idle" || phase === "typing";

  return (
    <div className="slide-font h-dvh w-full flex flex-col px-12 py-8 bg-background overflow-hidden">
      {/* Header */}
      <div className="shrink-0 mb-6">
        <Anim delay={0} animation="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight">Silex Search</h1>
        </Anim>
        <Anim delay={150} animation="animate-in fade-in duration-500">
          <p className="text-xl text-muted-foreground mt-2">
            Find anything across every firm system, instantly
          </p>
        </Anim>
      </div>

      {/* Main card */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <Anim delay={400} animation="animate-in fade-in duration-700" className="w-full max-w-5xl">
          <div className="rounded-2xl border bg-card shadow-sm p-8 overflow-hidden">
            {/* Greeting */}
            <Anim delay={600} animation="animate-in fade-in duration-600">
              <p className="text-2xl font-light text-foreground mb-6">
                Hi James, how can I help today?
              </p>
            </Anim>

            {/* Search bar card */}
            <Anim delay={800} animation="animate-in fade-in slide-in-from-bottom-4 duration-600">
              <div className="rounded-2xl bg-muted/50 border p-4 mb-6">
                {/* Tabs */}
                <div className="flex gap-6 mb-3 border-b pb-2">
                  <span className="text-sm font-semibold border-b-2 border-silex pb-2 -mb-[10px]">
                    Search
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1.5 pb-2 -mb-[10px]">
                    <MessageSquare className="size-3.5" />
                    Chat
                  </span>
                </div>

                {/* Input area */}
                <div className="flex items-center gap-3 rounded-xl bg-background border px-4 py-3">
                  <Search className="size-5 text-muted-foreground shrink-0" />
                  <span className="text-base text-foreground flex-1 min-h-[1.5rem]">
                    {phase === "idle" ? (
                      <span className="text-muted-foreground/50">Search across all sources...</span>
                    ) : (
                      <>
                        {typed}
                        {phase === "typing" && (
                          <span className="inline-block w-0.5 h-5 bg-foreground align-middle ml-px animate-pulse" />
                        )}
                      </>
                    )}
                  </span>
                </div>
              </div>
            </Anim>

            {/* Connected Sources (idle / typing only) */}
            {showSources && (
              <>
                <Anim delay={1000} animation="animate-in fade-in slide-in-from-bottom-4 duration-600">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Connected Sources
                  </p>
                  <div className="grid grid-cols-4 gap-3 mb-5">
                    {SOURCES.map((s, i) => (
                      <Anim
                        key={s.name}
                        delay={1100 + i * 120}
                        animation="animate-in fade-in slide-in-from-bottom-3 duration-500"
                      >
                        <div className="rounded-xl border bg-background p-3 flex items-start gap-3">
                          <div
                            className="size-8 rounded-md shrink-0 flex items-center justify-center text-white text-sm font-bold"
                            style={{ backgroundColor: s.color }}
                          >
                            {s.letter}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-medium truncate">{s.name}</span>
                              <Check className="size-3.5 text-green-500 shrink-0" />
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{s.desc}</p>
                            <p className="text-xs text-muted-foreground/70 mt-0.5">{s.docs}</p>
                          </div>
                        </div>
                      </Anim>
                    ))}
                  </div>
                </Anim>

                {/* Suggestion chips */}
                <Anim delay={1600} animation="animate-in fade-in duration-500">
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border bg-muted/40 px-4 py-1.5 text-sm text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Anim>
              </>
            )}

            {/* Searching state */}
            {phase === "searching" && (
              <Anim delay={0} animation="animate-in fade-in duration-400">
                <div className="flex items-center justify-center gap-3 py-12">
                  <Loader2 className="size-5 text-silex animate-spin" />
                  <span className="text-base text-muted-foreground">
                    Searching across all connected sources...
                  </span>
                </div>
              </Anim>
            )}

            {/* Results */}
            {phase === "done" && (
              <>
                <Anim delay={0} animation="animate-in fade-in duration-400">
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    6 results across 3 sources
                  </p>
                </Anim>

                <div className="flex gap-4">
                  {/* Results list */}
                  <div className="w-[55%] flex flex-col gap-1">
                    {RESULTS.map((r, i) => (
                      <Anim
                        key={r.title}
                        delay={100 + i * 100}
                        animation="animate-in fade-in slide-in-from-left-3 duration-400"
                      >
                        <div
                          className={`flex items-start gap-3 rounded-lg px-3 py-2.5 ${
                            i === 0 ? "bg-accent/60" : ""
                          }`}
                        >
                          <div
                            className="size-8 rounded-md shrink-0 flex items-center justify-center text-white text-xs font-bold mt-0.5"
                            style={{ backgroundColor: r.color }}
                          >
                            {r.letter}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">{r.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{r.snippet}</p>
                            <p className="text-xs text-muted-foreground/60 mt-0.5">
                              {r.source} · {r.type} · {r.date}
                            </p>
                          </div>
                        </div>
                      </Anim>
                    ))}
                  </div>

                  {/* Preview panel */}
                  <Anim
                    delay={800}
                    animation="animate-in fade-in slide-in-from-right-6 duration-600"
                    className="w-[45%]"
                  >
                    <div className="rounded-xl border bg-muted/30 p-5">
                      {/* Preview header */}
                      <h3 className="text-base font-semibold mb-1">
                        Non-Compete Clause — Standard Template
                      </h3>
                      <p className="text-xs text-muted-foreground mb-4">iManage · Template</p>

                      {/* Metadata */}
                      <div className="space-y-1.5 mb-4">
                        {PREVIEW_META.map((m) => (
                          <div key={m.key} className="flex text-xs">
                            <span className="text-muted-foreground w-28 shrink-0">{m.key}</span>
                            <span className="font-medium">{m.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Separator */}
                      <div className="border-t my-4" />

                      {/* Description */}
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                        Standard firm-wide template governing non-competition obligations for
                        departing attorneys and senior staff. Covers geographic restrictions,
                        temporal limitations, and carve-outs for pro bono and personal
                        representations. Updated to reflect 2024 FTC guidance and Texas-specific
                        enforceability requirements.
                      </p>

                      {/* Key Clauses */}
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Key Clauses
                      </p>
                      <ul className="space-y-1 mb-4">
                        {PREVIEW_CLAUSES.map((c) => (
                          <li key={c} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="mt-1.5 size-1 rounded-full bg-muted-foreground/40 shrink-0" />
                            {c}
                          </li>
                        ))}
                      </ul>

                      {/* Ask button */}
                      <button className="w-full rounded-lg bg-primary text-primary-foreground text-sm font-medium py-2 px-4">
                        Ask about this document
                      </button>
                    </div>
                  </Anim>
                </div>
              </>
            )}
          </div>
        </Anim>
      </div>
    </div>
  );
}
