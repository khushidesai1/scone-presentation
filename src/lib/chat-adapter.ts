import type { ChatModelAdapter } from "@assistant-ui/react";
import { LEGAL_SCENARIO } from "@/data/legal-responses";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const legalChatAdapter: ChatModelAdapter = {
  async *run({ abortSignal }) {
    // Phase 1: Yield tool calls progressively (simulates "Working..." steps)
    for (let i = 0; i < LEGAL_SCENARIO.workingSteps.length; i++) {
      const step = LEGAL_SCENARIO.workingSteps[i];
      await sleep(step.durationMs);
      if (abortSignal.aborted) return;

      // Build all tool-call parts up to current step
      const toolCalls = LEGAL_SCENARIO.workingSteps
        .slice(0, i + 1)
        .map((s, idx) => ({
          type: "tool-call" as const,
          toolCallId: `step_${s.id}`,
          toolName: "legal_research",
          argsText: JSON.stringify({
            stepLabel: s.label,
            stepIndex: idx,
            totalSteps: LEGAL_SCENARIO.workingSteps.length,
            isComplete: idx < i,
            isCurrent: idx === i,
          }),
          args: {
            stepLabel: s.label,
            stepIndex: idx,
            totalSteps: LEGAL_SCENARIO.workingSteps.length,
            isComplete: idx < i,
            isCurrent: idx === i,
          },
          result: idx < i ? { success: true } : undefined,
        }));

      yield { content: toolCalls };
    }

    // Mark all tool calls as complete
    const completedToolCalls = LEGAL_SCENARIO.workingSteps.map((s, idx) => ({
      type: "tool-call" as const,
      toolCallId: `step_${s.id}`,
      toolName: "legal_research",
      argsText: JSON.stringify({
        stepLabel: s.label,
        stepIndex: idx,
        totalSteps: LEGAL_SCENARIO.workingSteps.length,
        isComplete: true,
        isCurrent: false,
      }),
      args: {
        stepLabel: s.label,
        stepIndex: idx,
        totalSteps: LEGAL_SCENARIO.workingSteps.length,
        isComplete: true,
        isCurrent: false,
      },
      result: { success: true },
    }));

    // Phase 2: Stream the text response
    const fullText = LEGAL_SCENARIO.response;
    const chunkSize = 20;

    for (let i = 0; i < fullText.length; i += chunkSize) {
      await sleep(15);
      if (abortSignal.aborted) return;

      yield {
        content: [
          ...completedToolCalls,
          {
            type: "text" as const,
            text: fullText.slice(0, i + chunkSize),
          },
        ],
      };
    }
  },
};
