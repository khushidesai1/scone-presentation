import {
  ThreadPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  ChainOfThoughtPrimitive,
  useComposerRuntime,
} from "@assistant-ui/react";
import { MarkdownTextPrimitive } from "@assistant-ui/react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowRight,
  AtSign,
  ChevronDown,
  Paperclip,
  Sparkles,
  X,
  FileText,
  Briefcase,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LEGAL_SCENARIO } from "@/data/legal-responses";
import { TabbedInputHeader } from "@/components/TabbedInputHeader";
import { useDemoSettings } from "@/contexts/DemoSettings";
import type { MentionCandidate, MentionType } from "@/data/legal-context";
import { ContextPicker } from "@/components/ContextPicker";
import { SourceChips } from "@/components/SourceChips";
import { useMentionDetection } from "@/hooks/useMentionDetection";
import {
  type ChangeEvent,
  type KeyboardEvent,
  type SyntheticEvent,
  useCallback,
  useState,
} from "react";

const FOLLOW_UPS = [
  "Analyze how California's AB 1076 and SB 699 specifically strengthen the employee's position against out-of-state non-competes.",
  "Draft a demand letter to the former employer arguing the non-compete is unenforceable under California law.",
  "Evaluate whether the employer could pursue trade secret claims as an alternative to enforcing the non-compete.",
  "Compare how other states (New York, Illinois, Massachusetts) would treat this same non-compete clause.",
];

const MENTION_TYPE_ICONS: Record<MentionType, React.ReactNode> = {
  document: <FileText className="h-3 w-3" />,
  matter: <Briefcase className="h-3 w-3" />,
  client: <Users className="h-3 w-3" />,
};

interface ChatThreadProps {
  onSwitchToSearch?: () => void;
}

export function ChatThread({ onSwitchToSearch }: ChatThreadProps) {
  return (
    <ThreadPrimitive.Root className="flex flex-1 flex-col min-h-0">
      <ThreadPrimitive.Viewport className="flex flex-1 flex-col items-center overflow-y-auto scroll-smooth">
        <div className="w-full max-w-3xl flex-1 px-4">
          <ThreadPrimitive.Empty>
            <EmptyState onSwitchToSearch={onSwitchToSearch} />
          </ThreadPrimitive.Empty>

          <ThreadPrimitive.Messages
            components={{
              UserMessage,
              AssistantMessage,
            }}
          />
        </div>
      </ThreadPrimitive.Viewport>

      <ThreadPrimitive.If empty={false}>
        <BottomComposer />
      </ThreadPrimitive.If>
    </ThreadPrimitive.Root>
  );
}

function Greeting() {
  const { settings } = useDemoSettings();
  return (
    <h1
      className="w-full max-w-2xl text-2xl font-light tracking-tight mb-6"
      style={{ fontFamily: "'DM Sans Variable', sans-serif" }}
    >
      {settings.firstName
        ? `Hi ${settings.firstName}, how can I help today?`
        : "Hi there, how can I help today?"}
    </h1>
  );
}

/* ─── Empty State ─────────────────────────────────────────────────────── */

function EmptyState({ onSwitchToSearch }: { onSwitchToSearch?: () => void }) {
  const [selectedSources, setSelectedSources] = useState<Set<string>>(
    new Set(["westlaw"]),
  );
  const mention = useMentionDetection();
  const composerRuntime = useComposerRuntime();

  const toggleSource = useCallback((id: string) => {
    setSelectedSources((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const { value, selectionStart } = e.target;
      mention.detectMention(value, selectionStart);
    },
    [mention.detectMention],
  );

  const handleSelect = useCallback(
    (e: SyntheticEvent<HTMLTextAreaElement>) => {
      const target = e.target as HTMLTextAreaElement;
      const text = composerRuntime.getState().text;
      mention.detectMention(text, target.selectionStart);
    },
    [mention.detectMention, composerRuntime],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (!mention.isOpen) return;

      if (mention.showCategories) {
        if (e.key === "Escape") {
          e.preventDefault();
          mention.closePicker();
        }
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        mention.moveHighlight(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        mention.moveHighlight(-1);
      } else if (e.key === "Enter" && !e.shiftKey) {
        if (mention.filteredCandidates.length > 0) {
          e.preventDefault();
          handleCommitMention(
            mention.filteredCandidates[mention.highlightedIndex],
          );
        }
      } else if (e.key === "Tab") {
        if (mention.filteredCandidates.length > 0) {
          e.preventDefault();
          handleCommitMention(
            mention.filteredCandidates[mention.highlightedIndex],
          );
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        mention.closePicker();
      }
    },
    [mention],
  );

  const handleCommitMention = useCallback(
    (candidate: MentionCandidate) => {
      // Remove the @query from the text
      const text = composerRuntime.getState().text;
      if (mention.caretIndex !== null) {
        const before = text.slice(0, mention.caretIndex);
        const afterAt = text.slice(mention.caretIndex + 1 + mention.query.length);
        composerRuntime.setText(before + afterAt);
      }
      mention.commitMention(candidate);
    },
    [composerRuntime, mention],
  );

  const handleAtButtonClick = useCallback(() => {
    const text = composerRuntime.getState().text;
    composerRuntime.setText(text + "@");
    mention.openPicker(text.length);
  }, [composerRuntime, mention]);

  return (
    <div className="flex h-full flex-col items-center pt-[15vh]">
      {/* Greeting */}
      <Greeting />

      {/* Harvey-style large composer card */}
      <div className="relative w-full max-w-2xl">
        <div className="rounded-2xl bg-muted/50 border shadow-sm">
          {onSwitchToSearch && (
            <TabbedInputHeader
              activeTab="chat"
              onTabChange={(tab) => {
                if (tab === "search") onSwitchToSearch();
              }}
            />
          )}
          <ComposerPrimitive.Root className="flex flex-col">
            {/* Selected mention chips */}
            {mention.selectedMentions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 px-5 pt-4">
                {mention.selectedMentions.map((m, i) => (
                  <span
                    key={`${m.type}:${m.label}`}
                    className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-1 text-xs"
                  >
                    <span className="text-muted-foreground">
                      {MENTION_TYPE_ICONS[m.type]}
                    </span>
                    {m.label}
                    <button
                      type="button"
                      onClick={() => mention.removeMention(i)}
                      className="ml-0.5 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="relative">
              <ContextPicker
                isOpen={mention.isOpen}
                showCategories={mention.showCategories}
                selectedCategory={mention.selectedCategory}
                filteredCandidates={mention.filteredCandidates}
                highlightedIndex={mention.highlightedIndex}
                query={mention.query}
                onSelectCategory={mention.selectCategory}
                onBack={mention.goBack}
                onCommit={handleCommitMention}
                onSetHighlighted={(i) =>
                  mention.moveHighlight(
                    (i - mention.highlightedIndex) as 1 | -1,
                  )
                }
              />
              <ComposerPrimitive.Input
                placeholder="Ask a legal question..."
                className="min-h-[120px] w-full resize-none bg-transparent px-5 pt-5 pb-2 text-base outline-none placeholder:text-muted-foreground"
                autoFocus
                onChange={handleChange}
                onSelect={handleSelect}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="flex items-center justify-between px-4 pb-3 pt-1">
              <div className="flex items-center gap-1 text-muted-foreground">
                <button
                  type="button"
                  onClick={handleAtButtonClick}
                  className="rounded-lg p-2 hover:bg-muted transition-colors"
                >
                  <AtSign className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="rounded-lg p-2 hover:bg-muted transition-colors"
                >
                  <Paperclip className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="rounded-lg p-2 hover:bg-muted transition-colors"
                >
                  <Sparkles className="h-4 w-4" />
                </button>
              </div>
              <ComposerPrimitive.Send
                className={cn(
                  "flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground",
                  "transition-opacity disabled:opacity-30",
                )}
              >
                Ask Silex
                <ArrowRight className="h-4 w-4" />
              </ComposerPrimitive.Send>
            </div>
          </ComposerPrimitive.Root>
        </div>

        {/* Source chips below the composer */}
        <div className="mt-4 flex justify-center">
          <SourceChips selected={selectedSources} onToggle={toggleSource} />
        </div>
      </div>

      {/* Suggestion chips — only first is live */}
      <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-2xl">
        {LEGAL_SCENARIO.suggestedPrompts.map((prompt, i) =>
          i === 0 ? (
            <ThreadPrimitive.Suggestion
              key={prompt}
              prompt={prompt}
              send
              className="cursor-pointer rounded-full border bg-background px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {prompt}
            </ThreadPrimitive.Suggestion>
          ) : (
            <span
              key={prompt}
              className="rounded-full border bg-background px-4 py-2 text-sm text-muted-foreground/50 cursor-default"
            >
              {prompt}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

/* ─── User Message ────────────────────────────────────────────────────── */

function UserMessage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 py-6">
      <MessagePrimitive.Content
        components={{
          Text: ({ text }) => (
            <p className="text-base leading-relaxed">{text}</p>
          ),
        }}
      />
    </div>
  );
}

/* ─── Assistant Message ───────────────────────────────────────────────── */

function AssistantMessage() {
  return (
    <div className="animate-in fade-in duration-300 py-6">
      <MessagePrimitive.Content
        components={{
          ChainOfThought: ChainOfThoughtSection,
          Text: MarkdownText,
        }}
      />
      {/* Only show follow-ups when the thread is done streaming */}
      <ThreadPrimitive.If running={false}>
        <FollowUps />
      </ThreadPrimitive.If>
    </div>
  );
}

function FollowUps() {
  return (
    <div className="mt-8">
      <h3 className="text-base font-semibold mb-4">Follow-ups</h3>
      <div className="divide-y border-t">
        {FOLLOW_UPS.map((prompt) => (
          <ThreadPrimitive.Suggestion
            key={prompt}
            prompt={prompt}
            send
            className="block w-full cursor-pointer py-4 text-left text-sm leading-relaxed text-foreground/80 transition-colors hover:text-foreground"
          >
            {prompt}
          </ThreadPrimitive.Suggestion>
        ))}
      </div>
    </div>
  );
}

/* ─── Chain of Thought ────────────────────────────────────────────────── */

function ChainOfThoughtSection() {
  return (
    <ChainOfThoughtPrimitive.Root className="mb-6 animate-in fade-in duration-500">
      <ChainOfThoughtPrimitive.AccordionTrigger className="flex items-center gap-2 text-left group">
        <span className="text-sm font-medium text-foreground">
          Answering...
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform [[data-state=open]_&]:rotate-180" />
      </ChainOfThoughtPrimitive.AccordionTrigger>
      <div className="mt-2 ml-0.5 border-l-2 border-border pl-4">
        <ChainOfThoughtPrimitive.Parts />
      </div>
    </ChainOfThoughtPrimitive.Root>
  );
}

/* ─── Markdown Text ───────────────────────────────────────────────────── */

function MarkdownText() {
  return (
    <MarkdownTextPrimitive
      remarkPlugins={[remarkGfm]}
      className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-semibold prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3 prose-p:leading-relaxed prose-li:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:not-italic"
      smooth
    />
  );
}

/* ─── Bottom Composer (after messages) ────────────────────────────────── */

function BottomComposer() {
  const mention = useMentionDetection();
  const composerRuntime = useComposerRuntime();
  const [selectedSources, setSelectedSources] = useState<Set<string>>(
    new Set(["westlaw"]),
  );

  const toggleSource = useCallback((id: string) => {
    setSelectedSources((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      mention.detectMention(e.target.value, e.target.selectionStart);
    },
    [mention.detectMention],
  );

  const handleSelect = useCallback(
    (e: SyntheticEvent<HTMLTextAreaElement>) => {
      const target = e.target as HTMLTextAreaElement;
      const text = composerRuntime.getState().text;
      mention.detectMention(text, target.selectionStart);
    },
    [mention.detectMention, composerRuntime],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (!mention.isOpen) return;

      if (mention.showCategories) {
        if (e.key === "Escape") {
          e.preventDefault();
          mention.closePicker();
        }
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        mention.moveHighlight(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        mention.moveHighlight(-1);
      } else if (
        (e.key === "Enter" && !e.shiftKey) ||
        e.key === "Tab"
      ) {
        if (mention.filteredCandidates.length > 0) {
          e.preventDefault();
          handleCommitMention(
            mention.filteredCandidates[mention.highlightedIndex],
          );
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        mention.closePicker();
      }
    },
    [mention],
  );

  const handleCommitMention = useCallback(
    (candidate: MentionCandidate) => {
      const text = composerRuntime.getState().text;
      if (mention.caretIndex !== null) {
        const before = text.slice(0, mention.caretIndex);
        const afterAt = text.slice(
          mention.caretIndex + 1 + mention.query.length,
        );
        composerRuntime.setText(before + afterAt);
      }
      mention.commitMention(candidate);
    },
    [composerRuntime, mention],
  );

  const handleAtButtonClick = useCallback(() => {
    const text = composerRuntime.getState().text;
    composerRuntime.setText(text + "@");
    mention.openPicker(text.length);
  }, [composerRuntime, mention]);

  return (
    <div className="w-full border-t bg-background">
      <div className="mx-auto max-w-3xl px-4 py-3">
        <div className="relative">
          <div className="rounded-2xl bg-muted/50 border shadow-sm">
            <ComposerPrimitive.Root className="flex flex-col">
              {/* Selected mention chips */}
              {mention.selectedMentions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 px-4 pt-3">
                  {mention.selectedMentions.map((m, i) => (
                    <span
                      key={`${m.type}:${m.label}`}
                      className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-0.5 text-xs"
                    >
                      <span className="text-muted-foreground">
                        {MENTION_TYPE_ICONS[m.type]}
                      </span>
                      {m.label}
                      <button
                        type="button"
                        onClick={() => mention.removeMention(i)}
                        className="ml-0.5 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="relative">
                <ContextPicker
                  isOpen={mention.isOpen}
                  showCategories={mention.showCategories}
                  selectedCategory={mention.selectedCategory}
                  filteredCandidates={mention.filteredCandidates}
                  highlightedIndex={mention.highlightedIndex}
                  query={mention.query}
                  onSelectCategory={mention.selectCategory}
                  onBack={mention.goBack}
                  onCommit={handleCommitMention}
                  onSetHighlighted={(i) =>
                    mention.setHighlightedIndex(i)
                  }
                />
                <ComposerPrimitive.Input
                  placeholder="Ask a follow-up..."
                  className="min-h-[48px] w-full resize-none bg-transparent px-4 pt-3 pb-1 text-sm outline-none placeholder:text-muted-foreground"
                  onChange={handleChange}
                  onSelect={handleSelect}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <div className="flex items-center justify-between px-3 pb-2">
                <div className="flex items-center gap-0.5 text-muted-foreground">
                  <button
                    type="button"
                    onClick={handleAtButtonClick}
                    className="rounded-lg p-1.5 hover:bg-muted transition-colors"
                  >
                    <AtSign className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="rounded-lg p-1.5 hover:bg-muted transition-colors"
                  >
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="rounded-lg p-1.5 hover:bg-muted transition-colors"
                  >
                    <Sparkles className="h-4 w-4" />
                  </button>
                </div>
                <ComposerPrimitive.Send
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground",
                    "transition-all disabled:opacity-30 [&:not(:disabled)]:bg-primary [&:not(:disabled)]:text-primary-foreground",
                  )}
                >
                  <ArrowRight className="h-4 w-4" />
                </ComposerPrimitive.Send>
              </div>
            </ComposerPrimitive.Root>
          </div>
        </div>

        {/* Source chips below bottom composer */}
        <div className="mt-2 flex justify-center">
          <SourceChips selected={selectedSources} onToggle={toggleSource} />
        </div>
      </div>
    </div>
  );
}
