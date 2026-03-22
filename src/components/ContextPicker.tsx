import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Briefcase,
  Users,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MENTION_TYPE_META,
  MENTION_TYPE_ORDER,
  type MentionCandidate,
  type MentionType,
} from "@/data/legal-context";
import { useEffect, useRef } from "react";

const TYPE_ICONS: Record<MentionType, React.ReactNode> = {
  document: <FileText className="h-4 w-4" />,
  matter: <Briefcase className="h-4 w-4" />,
  client: <Users className="h-4 w-4" />,
};

interface ContextPickerProps {
  isOpen: boolean;
  showCategories: boolean;
  selectedCategory: MentionType | null;
  filteredCandidates: MentionCandidate[];
  highlightedIndex: number;
  query: string;
  onSelectCategory: (type: MentionType) => void;
  onBack: () => void;
  onCommit: (candidate: MentionCandidate) => void;
  onSetHighlighted: (index: number) => void;
}

export function ContextPicker({
  isOpen,
  showCategories,
  selectedCategory,
  filteredCandidates,
  highlightedIndex,
  query,
  onSelectCategory,
  onBack,
  onCommit,
  onSetHighlighted,
}: ContextPickerProps) {
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const node = rowRefs.current[highlightedIndex];
    if (node) node.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex]);

  if (!isOpen) return null;

  rowRefs.current = [];

  return (
    <div className="pointer-events-auto absolute right-0 bottom-full left-0 z-10 mb-2 max-w-[320px]">
      <div className="overflow-hidden rounded-2xl border bg-card shadow-xl">
        {showCategories ? (
          /* Category view */
          <div>
            <div className="border-b px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Search className="h-4 w-4" />
                <span>Search context</span>
              </div>
            </div>
            <div className="divide-y divide-border">
              {MENTION_TYPE_ORDER.map((type) => {
                const meta = MENTION_TYPE_META[type];
                return (
                  <button
                    key={type}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      onSelectCategory(type);
                    }}
                    className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-accent"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-4 w-4 items-center justify-center text-foreground">
                        {TYPE_ICONS[type]}
                      </span>
                      <span className="text-sm font-medium">
                        {meta.displayLabel}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* List view */
          <div>
            {selectedCategory && !query && (
              <div className="border-b px-4 py-3">
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onBack();
                  }}
                  className="flex w-full items-center gap-2 text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>
                    {MENTION_TYPE_META[selectedCategory].displayLabel}
                  </span>
                </button>
              </div>
            )}
            {query && (
              <div className="border-b px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Search className="h-4 w-4" />
                  <span>@{query}</span>
                </div>
              </div>
            )}
            {filteredCandidates.length > 0 ? (
              <div className="max-h-64 overflow-y-auto">
                <div className="divide-y divide-border/50">
                  {filteredCandidates.map((candidate, index) => {
                    const isActive = index === highlightedIndex;
                    return (
                      <button
                        key={`${candidate.type}:${candidate.label}`}
                        ref={(node) => {
                          rowRefs.current[index] = node;
                        }}
                        type="button"
                        className={cn(
                          "flex w-full items-center gap-2 px-4 py-2.5 text-left transition-colors",
                          isActive ? "bg-accent" : "hover:bg-accent/50",
                        )}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          onCommit(candidate);
                        }}
                        onMouseEnter={() => onSetHighlighted(index)}
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground">
                          {TYPE_ICONS[candidate.type]}
                        </span>
                        <div className="flex min-w-0 flex-col">
                          <span className="truncate text-sm">
                            {candidate.label}
                          </span>
                          {candidate.subtitle && (
                            <span className="truncate text-xs text-muted-foreground">
                              {candidate.subtitle}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="px-4 py-3 text-sm text-muted-foreground">
                No matches found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
