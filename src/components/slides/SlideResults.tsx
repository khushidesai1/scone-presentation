import { Anim } from "./slide-shared";

export function SlideResults() {
  return (
    <div className="slide-font h-dvh w-full flex flex-col px-8 pt-8 pb-4 bg-background overflow-hidden">
      {/* Header */}
      <div className="shrink-0 mb-4">
        <Anim delay={0} animation="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight">Results</h1>
        </Anim>
      </div>

      <div className="flex-1 flex flex-col gap-3 min-h-0">
        {/* Cheeky subtitle */}
        <Anim delay={200} animation="animate-in fade-in duration-600">
          <p className="text-2xl text-muted-foreground">
            TLDR we beat everyone
          </p>
        </Anim>

        {/* Figures side by side */}
        <div className="flex-1 flex gap-6 min-h-0">
          {/* Left: box plots — In-distribution and OOD */}
          <Anim delay={400} animation="animate-in fade-in slide-in-from-left-6 duration-600" className="flex-1 min-h-0 flex flex-col items-center gap-2">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground shrink-0">In-distribution and OOD</p>
            <img
              src="/results-boxplot.png"
              alt="In-distribution and OOD benchmarking"
              className="flex-1 min-h-0 max-w-full object-contain rounded-lg"
            />
          </Anim>

          {/* Right: tables — Large graphs and ablation */}
          <Anim delay={600} animation="animate-in fade-in slide-in-from-right-6 duration-600" className="flex-1 min-h-0 flex flex-col items-center gap-2">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground shrink-0">Large graphs and ablation</p>
            <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-3">
              <img
                src="/results-large.png"
                alt="Large graph results"
                className="max-w-full object-contain rounded-lg"
                style={{ maxHeight: "40%" }}
              />
              <img
                src="/results-table.png"
                alt="Ablation results table"
                className="max-w-full object-contain rounded-lg"
                style={{ maxHeight: "55%" }}
              />
            </div>
          </Anim>
        </div>
      </div>
    </div>
  );
}
