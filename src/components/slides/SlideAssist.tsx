import { useState, useEffect } from "react";
import { FileText, Sparkles, Check, Loader2 } from "lucide-react";
import { Anim } from "./slide-shared";

/* ------------------------------------------------------------------ */
/*  Working steps                                                      */
/* ------------------------------------------------------------------ */
const WORKING_STEPS = [
  "Reviewing current clauses",
  "Drafting revisions",
  "Cross-referencing firm precedent",
];

const SUMMARY_ITEMS = [
  "\u00a7 8.1 \u2014 Reduced non-compete to 18 months",
  "\u00a7 8.2 \u2014 Expanded non-solicitation scope",
  "\u00a7 8.4 \u2014 Added garden leave provision",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export function SlideAssist() {
  const [completedSteps, setCompletedSteps] = useState(0);
  const [showEdits, setShowEdits] = useState(false);
  const [showNewSection, setShowNewSection] = useState(false);

  /* Working steps progression */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    // Steps appear at 1800, 2100, 2400 — each completes 300ms after appearing
    timers.push(setTimeout(() => setCompletedSteps(1), 2100));
    timers.push(setTimeout(() => setCompletedSteps(2), 2400));
    timers.push(setTimeout(() => setCompletedSteps(3), 2700));
    return () => timers.forEach(clearTimeout);
  }, []);

  /* Document edits */
  useEffect(() => {
    const t = setTimeout(() => setShowEdits(true), 3000);
    return () => clearTimeout(t);
  }, []);

  /* New section */
  useEffect(() => {
    const t = setTimeout(() => setShowNewSection(true), 3800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="slide-font h-dvh w-full flex flex-col px-12 py-8 bg-background overflow-hidden">
      {/* Header */}
      <div className="shrink-0 mb-6">
        <Anim delay={0} animation="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight">Silex Assist</h1>
        </Anim>
        <Anim delay={150} animation="animate-in fade-in duration-500">
          <p className="text-xl text-muted-foreground mt-2">
            AI-powered drafting that works inside your documents
          </p>
        </Anim>
      </div>

      {/* Main card */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <Anim delay={300} animation="animate-in fade-in duration-700" className="w-full max-w-6xl h-full">
          <div className="rounded-2xl border bg-card shadow-sm h-full flex flex-col overflow-hidden">
            {/* Split pane */}
            <div className="flex flex-1 min-h-0">
              {/* ============ Left pane — Document ============ */}
              <div className="w-[60%] flex flex-col min-h-0">
                {/* Document title bar */}
                <Anim delay={500} animation="animate-in fade-in duration-600">
                  <div className="flex items-center gap-3 px-6 py-3 border-b">
                    <FileText className="size-4 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-sm font-medium">
                        Employment Agreement &mdash; J. Martinez 2024
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Last edited 2 weeks ago &middot; David Park
                      </p>
                    </div>
                  </div>
                </Anim>

                {/* Document content */}
                <Anim delay={800} animation="animate-in fade-in duration-700" className="flex-1 min-h-0">
                  <div className="px-8 py-6 overflow-y-auto h-full font-serif text-sm leading-relaxed text-foreground/90">
                    {/* Section 8.1 */}
                    <div className="mb-6">
                      <p className="font-bold mb-2">&sect; 8.1 Non-Competition</p>
                      <p>
                        The Employee agrees that for a period of{" "}
                        {showEdits ? (
                          <>
                            <span className="bg-red-100 line-through text-red-700/70 px-0.5 rounded-sm">
                              twenty-four (24) months
                            </span>{" "}
                            <span className="bg-emerald-50 text-emerald-700 px-0.5 rounded-sm">
                              eighteen (18) months
                            </span>
                          </>
                        ) : (
                          "twenty-four (24) months"
                        )}{" "}
                        following the termination of employment, Employee shall not, directly or
                        indirectly, engage in any business that competes with the Company&rsquo;s
                        business within the United States.
                      </p>
                    </div>

                    {/* Section 8.2 */}
                    <div className="mb-6">
                      <p className="font-bold mb-2">&sect; 8.2 Non-Solicitation</p>
                      <p>
                        The Employee agrees that for a period of twelve (12) months following
                        termination, Employee shall not solicit any customer or client of the
                        Company.
                      </p>
                      {showEdits && (
                        <div className="mt-3 border-l-2 border-emerald-400 bg-emerald-50/50 rounded-r-lg px-4 py-3">
                          <p className="text-sm leading-relaxed text-emerald-800">
                            Employee shall not, for a period of eighteen (18) months following
                            termination, directly or indirectly, (a) solicit any client or customer
                            of the Company, (b) solicit or hire any employee of the Company, or
                            (c) interfere with any business relationship of the Company.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Section 8.3 */}
                    <div className="mb-6">
                      <p className="font-bold mb-2">&sect; 8.3 Confidentiality</p>
                      <p>
                        Employee shall not disclose any Confidential Information during or after
                        the term of employment.
                      </p>
                    </div>

                    {/* Section 8.4 — New */}
                    {showNewSection && (
                      <div className="mb-6 border-l-2 border-emerald-400 bg-emerald-50/50 rounded-r-lg px-4 py-3">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-bold">&sect; 8.4 Garden Leave</p>
                          <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                            NEW
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-emerald-800">
                          Upon termination, the Company shall place Employee on garden leave for a
                          period of twelve (12) months, during which Employee shall continue to
                          receive base salary and benefits. Employee shall remain available for
                          consultation and shall not commence new employment.
                        </p>
                      </div>
                    )}
                  </div>
                </Anim>
              </div>

              {/* ============ Right pane — AI Sidebar ============ */}
              <div className="w-[40%] border-l flex flex-col min-h-0">
                <Anim delay={1400} animation="animate-in fade-in slide-in-from-right-8 duration-700" className="flex flex-col h-full">
                  {/* Sidebar header */}
                  <div className="flex items-center gap-2 px-5 py-3 border-b">
                    <Sparkles className="size-4 text-silex" />
                    <span className="text-silex font-semibold text-sm">Silex Assist</span>
                  </div>

                  {/* Sidebar content */}
                  <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                    {/* User instruction */}
                    <div className="bg-muted/50 rounded-lg px-4 py-3 border">
                      <p className="text-sm italic text-foreground/80">
                        &ldquo;Strengthen the non-solicitation clause to cover employees and add a
                        12-month garden leave provision&rdquo;
                      </p>
                    </div>

                    {/* Working steps */}
                    <div className="space-y-2">
                      {WORKING_STEPS.map((step, i) => (
                        <Anim
                          key={step}
                          delay={1800 + i * 300}
                          animation="animate-in fade-in slide-in-from-bottom-2 duration-400"
                        >
                          <div className="flex items-center gap-2.5">
                            {completedSteps > i ? (
                              <Check className="size-4 text-emerald-500 shrink-0" />
                            ) : (
                              <Loader2 className="size-4 text-silex animate-spin shrink-0" />
                            )}
                            <span className="text-sm text-muted-foreground">{step}</span>
                          </div>
                        </Anim>
                      ))}
                    </div>

                    {/* Summary card */}
                    <Anim delay={4400} animation="animate-in fade-in slide-in-from-bottom-4 duration-600">
                      <div className="rounded-lg border bg-background p-4">
                        <p className="text-sm font-semibold mb-3">3 changes suggested</p>
                        <div className="space-y-2 mb-4">
                          {SUMMARY_ITEMS.map((item) => (
                            <div key={item} className="flex items-start gap-2">
                              <Check className="size-3.5 text-emerald-500 mt-0.5 shrink-0" />
                              <span className="text-sm text-muted-foreground">{item}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <button className="bg-silex text-white rounded-lg px-4 py-2 text-sm font-medium">
                            Accept All
                          </button>
                          <button className="border rounded-lg px-4 py-2 text-sm font-medium">
                            Review
                          </button>
                        </div>
                      </div>
                    </Anim>
                  </div>
                </Anim>
              </div>
            </div>

            {/* Bottom status bar */}
            <Anim delay={5000} animation="animate-in fade-in duration-600">
              <div className="border-t px-6 py-3">
                <p className="text-xs text-muted-foreground">
                  Sources referenced: Non-Compete Clause Template (iManage) &middot; Tex. Bus. &amp; Com. Code &sect; 15.50 (Westlaw)
                </p>
              </div>
            </Anim>
          </div>
        </Anim>
      </div>
    </div>
  );
}
