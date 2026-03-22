import {
  Scale,
  FolderOpen,
  Building2,
  FileText,
  Check,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LEGAL_SOURCES } from "@/data/legal-context";

const SOURCE_ICONS: Record<string, React.ReactNode> = {
  westlaw: <Scale className="h-3.5 w-3.5" />,
  imanage: <FolderOpen className="h-3.5 w-3.5" />,
  "court-records": <Building2 className="h-3.5 w-3.5" />,
  "internal-memos": <FileText className="h-3.5 w-3.5" />,
};

interface SourceChipsProps {
  selected: Set<string>;
  onToggle: (id: string) => void;
}

export function SourceChips({ selected, onToggle }: SourceChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {LEGAL_SOURCES.map((source) => {
        const isSelected = selected.has(source.id);
        return (
          <button
            key={source.id}
            type="button"
            onClick={() => onToggle(source.id)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              isSelected
                ? "border-primary/30 bg-primary/5 text-primary"
                : "border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            {SOURCE_ICONS[source.id]}
            <span>{source.label}</span>
            {isSelected ? (
              <Check className="h-3 w-3" />
            ) : (
              <Plus className="h-3 w-3" />
            )}
          </button>
        );
      })}
    </div>
  );
}
