import type { SearchDocument } from "@/data/search-data";
import { SOURCE_LABELS } from "@/data/search-data";
import { X, MessageSquare } from "lucide-react";

interface PreviewPanelProps {
  doc: SearchDocument;
  onClose: () => void;
  onAskAbout: (doc: SearchDocument) => void;
}

export function PreviewPanel({ doc, onClose, onAskAbout }: PreviewPanelProps) {
  return (
    <div className="animate-in slide-in-from-right-8 duration-300 fixed top-0 right-0 z-50 h-dvh w-full max-w-md border-l bg-background shadow-xl flex flex-col">
      {/* Sticky header */}
      <div className="flex items-start gap-3 border-b px-5 py-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold leading-snug">{doc.title}</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {SOURCE_LABELS[doc.source]} · {doc.type}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        {/* Metadata table */}
        <div className="space-y-2">
          {Object.entries(doc.preview.metadata).map(([key, value]) => (
            <div key={key} className="flex items-baseline gap-3 text-sm">
              <span className="shrink-0 w-28 text-muted-foreground text-xs">
                {key}
              </span>
              <span className="text-sm">{value}</span>
            </div>
          ))}
        </div>

        <hr />

        {/* Full description */}
        <div className="text-sm leading-relaxed whitespace-pre-line text-foreground/90">
          {doc.preview.fullDescription}
        </div>

        {/* Key clauses */}
        {doc.preview.keyClauses && doc.preview.keyClauses.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold mb-2">Key Clauses</h3>
            <ul className="space-y-1.5">
              {doc.preview.keyClauses.map((clause) => (
                <li
                  key={clause}
                  className="flex items-start gap-2 text-sm text-foreground/80"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
                  {clause}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom action */}
      <div className="border-t px-5 py-4">
        <button
          type="button"
          onClick={() => onAskAbout(doc)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <MessageSquare className="h-4 w-4" />
          Ask about this document
        </button>
      </div>
    </div>
  );
}
