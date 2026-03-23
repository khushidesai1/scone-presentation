import { useState, useEffect } from "react";
import {
  Check,
  ChevronDown,
  Loader2,
  FileText,
  Briefcase,
  Scale,
  FolderOpen,
  Building2,
} from "lucide-react";
import { Anim } from "./slide-shared";

const CHAIN_OF_THOUGHT_STEPS = [
  "Assessing query",
  "Identifying applicable jurisdictions",
  "Researching state-specific non-compete statutes",
  "Analyzing enforceability factors",
  "Evaluating reasonableness of restrictions",
  "Reviewing recent case law developments",
  "Preparing comprehensive analysis",
];

const SOURCES = [
  { icon: Scale, label: "Westlaw", selected: true },
  { icon: FolderOpen, label: "iManage", selected: true },
  { icon: Building2, label: "Court Records", selected: false },
  { icon: FileText, label: "Internal Memos", selected: false },
] as const;

const FOLLOW_UPS = [
  "Analyze how California's AB 1076 and SB 699 specifically strengthen the employee's position",
  "Draft a demand letter arguing the non-compete is unenforceable under California law",
  "Evaluate whether the employer could pursue trade secret claims as an alternative",
  "Compare how other states (New York, Illinois, Massachusetts) would treat this clause",
];

export function SlideChat() {
  const [completedSteps, setCompletedSteps] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const [showFollowUps, setShowFollowUps] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const COT_START = 2000;
    const STEP_INTERVAL = 350;

    // Show each step one by one
    for (let i = 0; i < CHAIN_OF_THOUGHT_STEPS.length; i++) {
      timers.push(setTimeout(() => setCompletedSteps(i + 1), COT_START + i * STEP_INTERVAL));
    }

    // Mark all steps as "done" (last step gets check) then show response
    const allDoneAt = COT_START + CHAIN_OF_THOUGHT_STEPS.length * STEP_INTERVAL;
    timers.push(setTimeout(() => setCompletedSteps(CHAIN_OF_THOUGHT_STEPS.length + 1), allDoneAt));
    timers.push(setTimeout(() => setShowResponse(true), allDoneAt + 400));
    timers.push(setTimeout(() => setShowFollowUps(true), allDoneAt + 1800));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="slide-font h-dvh w-full flex flex-col px-12 py-8 bg-background overflow-hidden">
      {/* Header */}
      <Anim delay={0} animation="animate-in fade-in duration-700">
        <div className="mb-4">
          <h1 className="text-4xl font-bold tracking-tight">Silex Chat</h1>
          <p className="text-lg text-muted-foreground mt-1">
            AI legal research with full context of your firm
          </p>
        </div>
      </Anim>

      {/* Chat card */}
      <Anim
        delay={300}
        animation="animate-in fade-in duration-700"
        className="flex-1 min-h-0 flex justify-center"
      >
        <div className="max-w-4xl w-full rounded-2xl border bg-card shadow-sm p-6 overflow-hidden flex flex-col">
          {/* Mention chips */}
          <Anim delay={600} animation="animate-in fade-in duration-500">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium text-foreground/80">
                <FileText className="size-3.5" />
                Employment Agreement — J. Martinez 2024
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium text-foreground/80">
                <Briefcase className="size-3.5" />
                In re: Martinez Employment
              </span>
            </div>
          </Anim>

          {/* User message */}
          <Anim
            delay={900}
            animation="animate-in fade-in slide-in-from-bottom-4 duration-600"
          >
            <div className="mb-4">
              <p className="text-base leading-relaxed text-foreground">
                Is the Martinez non-compete enforceable now that she moved to
                California?
              </p>
            </div>
          </Anim>

          {/* Source chips */}
          <Anim delay={1400} animation="animate-in fade-in duration-500">
            <div className="flex items-center gap-2 mb-5">
              {SOURCES.map((source) => (
                <span
                  key={source.label}
                  className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium ${
                    source.selected
                      ? "border-silex/30 bg-silex/5 text-silex"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {source.selected && <Check className="size-3" />}
                  <source.icon className="size-3.5" />
                  {source.label}
                </span>
              ))}
            </div>
          </Anim>

          {/* Answering header */}
          <Anim delay={1800} animation="animate-in fade-in duration-500">
            <div className="flex items-center gap-1.5 mb-3 text-sm font-medium text-foreground/70">
              <ChevronDown className="size-4" />
              Answering...
            </div>
          </Anim>

          {/* Chain of thought steps */}
          <div className="border-l-2 border-border ml-0.5 pl-4 mb-4">
            {CHAIN_OF_THOUGHT_STEPS.map((step, i) => {
              if (completedSteps <= i) return null;

              const isCompleted = completedSteps > i + 1;

              return (
                <div
                  key={step}
                  className="animate-in fade-in duration-300 flex items-center gap-2.5 py-1"
                  style={{ animationFillMode: "both" }}
                >
                  {isCompleted ? (
                    <Check className="size-3.5 text-emerald-500" />
                  ) : (
                    <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {step}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Markdown response */}
          {showResponse && (
          <div
            className="animate-in fade-in duration-700 flex-1 min-h-0 overflow-hidden"
            style={{ animationFillMode: "both" }}
          >
            <div className="overflow-hidden">
              <h2 className="text-lg font-semibold mt-5 mb-2">
                Non-Compete Enforceability Analysis: Texas to California
              </h2>
              <p className="text-sm leading-relaxed text-foreground/90 mb-3">
                Based on the jurisdictional analysis and applicable state
                statutes, here is a comprehensive assessment of the non-compete
                clause's enforceability when an employee relocates from Texas to
                California.
              </p>

              <h2 className="text-lg font-semibold mt-5 mb-2">
                Jurisdictional Analysis
              </h2>
              <p className="text-sm leading-relaxed text-foreground/90 mb-3">
                The threshold issue is{" "}
                <span className="font-semibold">
                  which state's law governs
                </span>{" "}
                the non-compete agreement. This is critical because Texas and
                California take diametrically opposed approaches to non-compete
                enforcement.
              </p>
              <ul className="space-y-2 mb-3 ml-1">
                <li className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                  <span className="text-foreground/50 mt-1 shrink-0">•</span>
                  <span>
                    <span className="font-semibold">California</span> (Bus. &
                    Prof. Code § 16600) maintains a near-total ban on
                    non-compete agreements. With narrow exceptions for the sale
                    of a business, non-competes are void and unenforceable as a
                    matter of public policy.
                  </span>
                </li>
                <li className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                  <span className="text-foreground/50 mt-1 shrink-0">•</span>
                  <span>
                    <span className="font-semibold">Texas</span> (Tex. Bus. &
                    Com. Code § 15.50) permits non-compete agreements that are
                    ancillary to an otherwise enforceable agreement and contain
                    reasonable limitations as to time, geographic area, and scope
                    of activity.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          )}

          {/* Follow-ups */}
          {showFollowUps && (
            <div
              className="animate-in fade-in slide-in-from-bottom-4 duration-600 mt-4 pt-4 border-t"
              style={{ animationFillMode: "both" }}
            >
              <h3 className="text-base font-semibold mb-3">Follow-ups</h3>
              <div className="divide-y">
                {FOLLOW_UPS.map((item) => (
                  <div
                    key={item}
                    className="py-3 text-sm text-foreground/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Anim>
    </div>
  );
}
