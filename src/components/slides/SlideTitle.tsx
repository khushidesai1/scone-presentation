import { Anim } from "./slide-shared";

export function SlideTitle() {
  return (
    <div className="slide-font h-dvh w-full flex flex-col items-center justify-center px-12 py-8 bg-background overflow-hidden relative">
      {/* Faint grid background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-border/60"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="text-center max-w-4xl relative z-10">
        <Anim delay={0} animation="animate-in fade-in slide-in-from-bottom-4 duration-600">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-5 py-2 text-sm text-muted-foreground mb-10 shadow-sm">
            SCONE Lab Meeting &middot; March 24, 2026
          </div>
        </Anim>

        <Anim delay={250} animation="animate-in fade-in slide-in-from-bottom-6 duration-700">
          <h1 className="text-[7rem] font-bold tracking-tight leading-none mb-4 text-foreground">
            SCONE
          </h1>
        </Anim>

        <Anim delay={550} animation="animate-in fade-in duration-700">
          <p className="text-2xl text-muted-foreground font-light leading-relaxed mb-14">
            Scalable Contrastive Causal Discovery
            <br />
            under Unknown Soft Interventions
          </p>
        </Anim>

        <Anim delay={950} animation="animate-in fade-in slide-in-from-bottom-3 duration-500">
          <div className="text-lg text-muted-foreground/60 font-medium">
            Khushi
          </div>
        </Anim>
      </div>
    </div>
  );
}
