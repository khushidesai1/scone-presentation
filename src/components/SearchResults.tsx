import type { SearchDocument, SourceId } from "@/data/search-data";
import { SOURCE_LABELS } from "@/data/search-data";
import { cn } from "@/lib/utils";

const SOURCE_COLORS: Record<SourceId, string> = {
  imanage: "#0066CC",
  westlaw: "#CC0000",
  sharepoint: "#038387",
  outlook: "#0078D4",
  netdocuments: "#4B0082",
};

const TYPE_LABELS: Record<string, string> = {
  contract: "Contract",
  brief: "Brief",
  memo: "Memo",
  statute: "Statute",
  email: "Email",
  opinion: "Opinion",
  template: "Template",
};

interface SearchResultsProps {
  results: SearchDocument[];
  selectedId: string | null;
  onSelect: (doc: SearchDocument) => void;
}

export function SearchResults({ results, selectedId, onSelect }: SearchResultsProps) {
  const sourceCount = new Set(results.map((r) => r.source)).size;

  return (
    <div className="w-full max-w-2xl">
      <p className="text-sm text-muted-foreground mb-3">
        {results.length} result{results.length !== 1 ? "s" : ""} across{" "}
        {sourceCount} source{sourceCount !== 1 ? "s" : ""}
      </p>
      <div className="divide-y rounded-xl border bg-background">
        {results.map((doc) => (
          <button
            key={doc.id}
            type="button"
            onClick={() => onSelect(doc)}
            className={cn(
              "flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-accent/50",
              "first:rounded-t-xl last:rounded-b-xl",
              selectedId === doc.id && "bg-accent/60",
            )}
          >
            {/* Source icon */}
            <div
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white text-xs font-bold"
              style={{ backgroundColor: SOURCE_COLORS[doc.source] }}
            >
              {SOURCE_LABELS[doc.source].charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-snug truncate">
                {doc.title}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                {doc.snippet}
              </p>
              <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span>{SOURCE_LABELS[doc.source]}</span>
                <span>·</span>
                <span>{TYPE_LABELS[doc.type] ?? doc.type}</span>
                <span>·</span>
                <span>{doc.date}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
