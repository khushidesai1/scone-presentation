import { useState, useEffect } from "react";
import {
  Mail,
  Paperclip,
  Check,
  Loader2,
  FileText,
  Sparkles,
  Send,
} from "lucide-react";
import { Anim } from "./slide-shared";

const WORKING_STEPS = [
  "Reading email request",
  "Pulling Martinez employment agreement from iManage",
  "Researching California BPC § 16600 on Westlaw",
  "Reviewing partner email thread on enforceability",
  "Drafting client-ready memo",
];

export function SlideAgent() {
  const [completedSteps, setCompletedSteps] = useState(0);
  const [showReply, setShowReply] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const WORK_START = 2800;
    const STEP_INTERVAL = 500;

    for (let i = 0; i < WORKING_STEPS.length; i++) {
      timers.push(
        setTimeout(() => setCompletedSteps(i + 1), WORK_START + i * STEP_INTERVAL),
      );
    }

    const allDoneAt = WORK_START + WORKING_STEPS.length * STEP_INTERVAL;
    timers.push(setTimeout(() => setCompletedSteps(WORKING_STEPS.length + 1), allDoneAt));
    timers.push(setTimeout(() => setShowReply(true), allDoneAt + 600));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="slide-font h-dvh w-full flex flex-col px-12 py-8 bg-background overflow-hidden">
      {/* Header */}
      <Anim delay={0} animation="animate-in fade-in duration-700">
        <div className="mb-6">
          <h1 className="text-4xl font-bold tracking-tight">Silex Agent</h1>
          <p className="text-lg text-muted-foreground mt-1">
            Email an instruction. Get the work done.
          </p>
        </div>
      </Anim>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <div className="flex gap-8 w-full max-w-7xl items-stretch">
          {/* Left: Outgoing email */}
          <Anim
            delay={400}
            animation="animate-in fade-in slide-in-from-left-8 duration-700"
            className="flex-1"
          >
            <div className="rounded-2xl border bg-card shadow-sm h-full flex flex-col">
              {/* Email header */}
              <div className="px-6 py-4 border-b">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
                    <Send className="size-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Sent
                  </span>
                </div>
                <Anim delay={700} animation="animate-in fade-in duration-500">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-12 shrink-0">From:</span>
                      <span className="font-medium">James Wilson (Partner)</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-12 shrink-0">To:</span>
                      <span className="font-medium text-silex">Silex Agent</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-12 shrink-0">Re:</span>
                      <span className="font-medium">Martinez non-compete — client meeting prep</span>
                    </div>
                  </div>
                </Anim>
              </div>

              {/* Email body */}
              <Anim delay={1100} animation="animate-in fade-in duration-600" className="flex-1">
                <div className="px-6 py-5">
                  <p className="text-base leading-relaxed text-foreground/90">
                    Hey, I have a client meeting with Acme Corp tomorrow morning on
                    the Martinez situation. Can you pull together a memo covering:
                  </p>
                  <ul className="mt-3 space-y-2 ml-1">
                    <li className="flex gap-2 text-base leading-relaxed text-foreground/90">
                      <span className="text-muted-foreground mt-0.5 shrink-0">1.</span>
                      <span>Whether the non-compete is enforceable now that she's in California</span>
                    </li>
                    <li className="flex gap-2 text-base leading-relaxed text-foreground/90">
                      <span className="text-muted-foreground mt-0.5 shrink-0">2.</span>
                      <span>Our options if it's void under California law</span>
                    </li>
                    <li className="flex gap-2 text-base leading-relaxed text-foreground/90">
                      <span className="text-muted-foreground mt-0.5 shrink-0">3.</span>
                      <span>A recommended strategy for the meeting</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-base leading-relaxed text-foreground/90">
                    Thanks.
                  </p>
                  <p className="mt-2 text-base text-foreground/70">
                    — JW
                  </p>
                </div>
              </Anim>
            </div>
          </Anim>

          {/* Center: Working indicator */}
          <div className="flex flex-col items-center justify-center w-64 shrink-0">
            <Anim delay={2200} animation="animate-in fade-in duration-500">
              <div className="flex flex-col items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-silex/10 flex items-center justify-center ring-2 ring-silex/20">
                  <Sparkles className="size-6 text-silex" />
                </div>
                <span className="text-sm font-semibold text-silex">Silex Agent</span>
              </div>
            </Anim>

            {/* Working steps */}
            <div className="mt-5 w-full space-y-2.5">
              {WORKING_STEPS.map((step, i) => {
                if (completedSteps <= i) return null;
                const isCompleted = completedSteps > i + 1;
                return (
                  <div
                    key={step}
                    className="animate-in fade-in duration-300 flex items-center gap-2.5"
                    style={{ animationFillMode: "both" }}
                  >
                    {isCompleted ? (
                      <Check className="size-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <Loader2 className="size-3.5 animate-spin text-muted-foreground shrink-0" />
                    )}
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Reply email */}
          {showReply && (
            <div
              className="animate-in fade-in slide-in-from-right-8 duration-700 flex-1"
              style={{ animationFillMode: "both" }}
            >
              <div className="rounded-2xl border bg-card shadow-sm h-full flex flex-col border-silex/20">
                {/* Email header */}
                <div className="px-6 py-4 border-b">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-silex/10">
                      <Mail className="size-4 text-silex" />
                    </div>
                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Reply
                    </span>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-12 shrink-0">From:</span>
                      <span className="font-medium text-silex">Silex Agent</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-12 shrink-0">To:</span>
                      <span className="font-medium">James Wilson (Partner)</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground w-12 shrink-0">Re:</span>
                      <span className="font-medium">Martinez non-compete — client meeting prep</span>
                    </div>
                  </div>
                </div>

                {/* Reply body */}
                <div className="px-6 py-5 flex-1">
                  <p className="text-base leading-relaxed text-foreground/90">
                    Hi James, here's the memo for tomorrow's meeting. Key takeaways:
                  </p>
                  <ul className="mt-3 space-y-2 ml-1">
                    <li className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                      <span className="text-emerald-500 mt-0.5 shrink-0">
                        <Check className="size-4" />
                      </span>
                      <span>
                        The non-compete is <span className="font-semibold">very likely unenforceable</span> under
                        California BPC § 16600, even with Texas choice-of-law
                      </span>
                    </li>
                    <li className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                      <span className="text-emerald-500 mt-0.5 shrink-0">
                        <Check className="size-4" />
                      </span>
                      <span>
                        Best alternative: pursue <span className="font-semibold">trade secret claims</span> under
                        DTSA rather than the non-compete
                      </span>
                    </li>
                    <li className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                      <span className="text-emerald-500 mt-0.5 shrink-0">
                        <Check className="size-4" />
                      </span>
                      <span>
                        Recommended <span className="font-semibold">negotiation-first</span> approach
                        before any litigation
                      </span>
                    </li>
                  </ul>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                    Full analysis with citations attached. Let me know if you need
                    anything else before the meeting.
                  </p>

                  {/* Attachments */}
                  <div className="mt-5 space-y-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Attachments
                    </span>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3.5 py-2.5">
                        <FileText className="size-4 text-silex" />
                        <div>
                          <p className="text-sm font-medium leading-tight">Martinez Non-Compete Memo.pdf</p>
                          <p className="text-xs text-muted-foreground">12 pages</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3.5 py-2.5">
                        <Paperclip className="size-4 text-silex" />
                        <div>
                          <p className="text-sm font-medium leading-tight">Meeting Talking Points.pdf</p>
                          <p className="text-xs text-muted-foreground">3 pages</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
