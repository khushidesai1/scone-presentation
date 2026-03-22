import { makeAssistantToolUI } from "@assistant-ui/react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LEGAL_SCENARIO } from "@/data/legal-responses";

interface StepArgs {
  stepLabel: string;
  stepIndex: number;
  totalSteps: number;
  isComplete: boolean;
  isCurrent: boolean;
}

export const LegalResearchToolUI = makeAssistantToolUI<StepArgs, unknown>({
  toolName: "legal_research",
  render: ({ args }) => {
    // This component renders once per tool-call part, but we only want
    // to render the full step list from the LAST tool-call (highest stepIndex).
    // The ChainOfThought component will handle grouping.
    // We render individual steps here — ChainOfThought groups them.
    return (
      <div className="flex items-center gap-2 py-0.5">
        {args.isComplete ? (
          <Check className="h-4 w-4 shrink-0 text-emerald-600" />
        ) : args.isCurrent ? (
          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
        ) : (
          <div className="h-4 w-4 shrink-0" />
        )}
        <span
          className={cn(
            "text-sm",
            args.isComplete && "text-foreground",
            args.isCurrent && "text-foreground",
            !args.isComplete && !args.isCurrent && "text-muted-foreground",
          )}
        >
          {args.stepLabel}
        </span>
      </div>
    );
  },
});

export function WorkingStepsHeader() {
  const totalSteps = LEGAL_SCENARIO.workingSteps.length;
  return (
    <span className="text-sm font-medium text-muted-foreground">
      Analyzed in {totalSteps} steps
    </span>
  );
}
