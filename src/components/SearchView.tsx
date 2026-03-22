import { useState, useCallback, useRef, useEffect } from "react";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { SEARCH_DOCUMENTS, type SearchDocument } from "@/data/search-data";
import { TabbedInputHeader } from "@/components/TabbedInputHeader";
import { IntegrationsGrid } from "@/components/IntegrationsGrid";
import { SearchResults } from "@/components/SearchResults";
import { PreviewPanel } from "@/components/PreviewPanel";
import { useDemoSettings } from "@/contexts/DemoSettings";

// Build a lookup for curated results by document ID
const byId = (ids: string[]) =>
  ids.map((id) => SEARCH_DOCUMENTS.find((d) => d.id === id)!);

// Curated result sets for the demo — first suggestion is the "hero" flow
const CURATED_RESULTS: Record<string, SearchDocument[]> = {
  "Non-compete agreements signed in Texas": byId([
    "2",  // Employment Agreement — J. Martinez 2024 (Texas, non-compete)
    "1",  // Non-Compete Clause — Standard Template
    "12", // Tex. Bus. & Com. Code § 15.50
    "10", // RE: Martinez Non-Compete — Enforceability Analysis
    "15", // FTC Non-Compete Ban — Final Rule Analysis
    "18", // Associate Training — Non-Compete Enforceability Guide
  ]),
};

// Fallback for non-curated queries
const FALLBACK_RESULTS = SEARCH_DOCUMENTS;

const SUGGESTED_SEARCHES = [
  "Non-compete agreements signed in Texas",
  "TechFlow acquisition due diligence docs",
  "Recent employment settlement agreements",
  "Patent licensing and cross-license terms",
];

type SearchState = "idle" | "searching" | "done";

interface SearchViewProps {
  onSwitchToChat: () => void;
}

export function SearchView({ onSwitchToChat }: SearchViewProps) {
  const { settings } = useDemoSettings();
  const [query, setQuery] = useState("");
  const [searchState, setSearchState] = useState<SearchState>("idle");
  const [results, setResults] = useState<SearchDocument[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<SearchDocument | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const runSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setQuery(searchQuery);
    setSearchState("searching");
    setResults([]);
    setSelectedDoc(null);

    setTimeout(() => {
      setResults(CURATED_RESULTS[searchQuery] ?? FALLBACK_RESULTS);
      setSearchState("done");
    }, 1400);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        runSearch(query);
      }
    },
    [runSearch, query],
  );

  // Reset to idle when query is cleared
  useEffect(() => {
    if (!query.trim() && searchState !== "idle") {
      setSearchState("idle");
      setResults([]);
      setSelectedDoc(null);
    }
  }, [query, searchState]);

  const handleAskAbout = useCallback(
    (_doc: SearchDocument) => {
      onSwitchToChat();
    },
    [onSwitchToChat],
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col items-center px-4 py-8 pt-[15vh]">
        {/* Greeting */}
        <h1 className="w-full max-w-2xl text-2xl font-light tracking-tight mb-6" style={{ fontFamily: "'DM Sans Variable', sans-serif" }}>
          {settings.firstName
            ? `Hi ${settings.firstName}, how can I help today?`
            : "Hi there, how can I help today?"}
        </h1>

        {/* Tabbed input card */}
        <div className="w-full max-w-2xl mb-8">
          <div className="rounded-2xl bg-muted/50 border shadow-sm overflow-hidden">
            <TabbedInputHeader
              activeTab="search"
              onTabChange={(tab) => {
                if (tab === "chat") onSwitchToChat();
              }}
            />
            <div className="flex items-center gap-3 px-5 py-4">
              <SearchIcon className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search across all firm documents..."
                className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
                autoFocus
              />
              {searchState === "searching" && (
                <Loader2 className="h-4 w-4 text-muted-foreground animate-spin shrink-0" />
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        {searchState === "searching" && (
          <div className="flex flex-col items-center gap-3 py-12 text-muted-foreground animate-in fade-in duration-300">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="text-sm">Searching across all connected sources...</p>
          </div>
        )}

        {searchState === "done" && (
          <SearchResults
            results={results}
            selectedId={selectedDoc?.id ?? null}
            onSelect={setSelectedDoc}
          />
        )}

        {searchState === "idle" && (
          <>
            <IntegrationsGrid />

            {/* Suggested searches — only first is live */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-2xl">
              {SUGGESTED_SEARCHES.map((prompt, i) =>
                i === 0 ? (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => runSearch(prompt)}
                    className="cursor-pointer rounded-full border bg-background px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {prompt}
                  </button>
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
          </>
        )}
      </div>

      {/* Preview panel */}
      {selectedDoc && (
        <PreviewPanel
          doc={selectedDoc}
          onClose={() => setSelectedDoc(null)}
          onAskAbout={handleAskAbout}
        />
      )}
    </div>
  );
}
