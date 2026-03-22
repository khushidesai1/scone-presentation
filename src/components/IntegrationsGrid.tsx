import { INTEGRATION_SOURCES } from "@/data/search-data";
import { Check } from "lucide-react";

export function IntegrationsGrid() {
  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">
        Connected Sources
      </h3>
      <div className="grid grid-cols-4 gap-3">
        {INTEGRATION_SOURCES.map((source) => (
          <div
            key={source.id}
            className="group relative flex flex-col items-center gap-2 rounded-xl border bg-background p-4 transition-colors hover:bg-accent/50"
          >
            {/* Source icon */}
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg text-white text-sm font-bold"
              style={{ backgroundColor: source.color }}
            >
              {source.name.charAt(0)}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium leading-tight">{source.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {source.description}
              </p>
            </div>
            <span className="text-[11px] text-muted-foreground">
              {source.docCount}
            </span>
            {/* Connected badge */}
            <div className="absolute top-2 right-2">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                <Check className="h-2.5 w-2.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
