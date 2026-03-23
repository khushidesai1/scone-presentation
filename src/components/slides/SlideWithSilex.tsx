import {
  Building2,
  Users,
  Sparkles,
  Monitor,
  Mail,
  MessageSquare,
  Phone,
  Lock,
  Shield,
  Check,
  type LucideIcon,
} from "lucide-react";
import {
  Anim,
  PersonCircle,
  TreeConnector,
  PARTNERS,
  ASSOCIATES,
  TOOLS,
} from "./slide-shared";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const VALUE_PROPS: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Sparkles,
    title: "Ease of use",
    description:
      "All the context you need for drafting, search, and research. There from day one. No manual uploads.",
  },
  {
    icon: Shield,
    title: "Personalized via your data",
    description:
      "Full context of your firm. Clients, matters, precedents built in from day one.",
  },
  {
    icon: Check,
    title: "Thoughtfulness + Velocity",
    description:
      "Deeper research on specialized matters. Faster turnaround on routine work.",
  },
];

const CHANNELS: { icon: LucideIcon; label: string }[] = [
  { icon: Monitor, label: "Desktop" },
  { icon: Mail, label: "Email" },
  { icon: MessageSquare, label: "Text" },
  { icon: Phone, label: "Phone" },
];

export function SlideWithSilex() {
  const T_TITLE = 0;
  const T_BOX = 300;
  const T_PARTNERS = 600;
  const T_TREE1 = 900;
  const T_SILEX_BORDER = 1100;
  const T_ASSOCIATES = 1300;
  const T_TREE2 = 1600;
  const T_TOOLS = 1800;
  const T_CHANNELS = 2200;
  const T_PRIVACY = 2600;
  const T_VALUE_PROPS = 2000;

  return (
    <div className="slide-font h-dvh w-full flex flex-col px-12 py-8 bg-background overflow-hidden">
      {/* Header */}
      <div className="shrink-0 mb-6">
        <Anim
          delay={T_TITLE}
          animation="animate-in fade-in slide-in-from-top-4 duration-700"
        >
          <h1 className="text-4xl font-bold tracking-tight">
            Your Firm with Silex
          </h1>
        </Anim>
        <Anim
          delay={T_TITLE + 150}
          animation="animate-in fade-in duration-500"
        >
          <p className="text-xl text-muted-foreground mt-2">
            Fully integrated AI, built into the fabric of your firm
          </p>
        </Anim>
      </div>

      {/* Main content: firm box + value props */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <div className="flex items-stretch gap-10 w-full max-w-7xl">
          {/* ──────────── FIRM BOX ──────────── */}
          <Anim
            delay={T_BOX}
            animation="animate-in fade-in duration-700"
            className="flex-[1.3]"
          >
            <div className="rounded-2xl border bg-card shadow-sm p-7 h-full flex flex-col">
              {/* Firm header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-silex/10">
                  <Building2 className="h-5 w-5 text-silex" />
                </div>
                <h2 className="text-2xl font-semibold">Law Firm</h2>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center gap-1">
                {/* Partners */}
                <Anim
                  delay={T_PARTNERS}
                  animation="animate-in fade-in slide-in-from-top-4 duration-500"
                >
                  <div className="flex items-center gap-2 mb-2 justify-center">
                    <Users className="size-4 text-muted-foreground" />
                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Partners
                    </span>
                  </div>
                  <div className="flex items-center gap-4 justify-center">
                    {PARTNERS.map((p) => (
                      <PersonCircle key={p.initials} initials={p.initials} />
                    ))}
                  </div>
                </Anim>

                <TreeConnector delay={T_TREE1} />

                {/* ── Silex AI dashed boundary ── */}
                <Anim
                  delay={T_SILEX_BORDER}
                  animation="animate-in fade-in duration-700"
                  className="w-full"
                >
                  <div className="relative border-2 border-dashed border-silex/30 rounded-2xl px-6 py-5 mt-1 bg-silex/[0.03]">
                    {/* Label */}
                    <div className="absolute -top-3.5 left-6 bg-card px-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="size-4 text-silex" />
                        <span className="text-sm font-bold text-silex uppercase tracking-wide">
                          Silex AI
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-1 mt-2">
                      {/* Associates */}
                      <Anim
                        delay={T_ASSOCIATES}
                        animation="animate-in fade-in slide-in-from-top-4 duration-500"
                      >
                        <div className="flex items-center gap-2 mb-2 justify-center">
                          <Users className="size-4 text-muted-foreground" />
                          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                            Associates
                          </span>
                        </div>
                        <div className="flex items-start gap-3.5 justify-center">
                          {ASSOCIATES.map((a) => (
                            <div key={a.initials} className="relative flex flex-col items-center">
                              {a.isSilex ? (
                                <div className="h-12 w-12 rounded-full bg-silex/15 text-silex text-sm font-semibold flex items-center justify-center ring-2 ring-silex/30">
                                  {a.initials}
                                </div>
                              ) : (
                                <PersonCircle initials={a.initials} />
                              )}
                              {a.isSilex && (
                                <span className="absolute -bottom-5 text-[10px] font-semibold text-silex whitespace-nowrap">
                                  Silex Agent
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </Anim>

                      <TreeConnector delay={T_TREE2} />

                      {/* Tools */}
                      <Anim
                        delay={T_TOOLS}
                        animation="animate-in fade-in slide-in-from-top-4 duration-500"
                      >
                        <div className="flex items-center gap-2 mb-2 justify-center">
                          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                            Tools & Systems
                          </span>
                        </div>
                        <div className="flex items-center gap-4 justify-center">
                          {TOOLS.map((tool) => (
                            <div
                              key={tool.name}
                              className="flex flex-col items-center gap-1.5"
                            >
                              <div className="h-11 w-11 rounded-xl bg-silex/10 flex items-center justify-center">
                                <tool.icon className="size-5 text-silex/60" />
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {tool.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </Anim>
                    </div>

                    {/* Always-on channels */}
                    <Anim
                      delay={T_CHANNELS}
                      animation="animate-in fade-in duration-500"
                    >
                      <div className="flex items-center justify-center gap-5 mt-5 pt-4 border-t border-dashed border-silex/15">
                        <span className="text-xs font-semibold text-silex/60 uppercase tracking-wide">
                          Always on via
                        </span>
                        {CHANNELS.map((ch) => (
                          <div
                            key={ch.label}
                            className="flex items-center gap-1.5"
                          >
                            <ch.icon className="size-4 text-silex/50" />
                            <span className="text-sm text-muted-foreground">
                              {ch.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Anim>
                  </div>
                </Anim>
              </div>

              {/* Data privacy footer */}
              <Anim
                delay={T_PRIVACY}
                animation="animate-in fade-in slide-in-from-bottom-4 duration-700"
              >
                <div className="flex items-center gap-4 mt-6 rounded-xl bg-silex/5 border border-silex/15 px-5 py-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-silex/10 shrink-0">
                    <Lock className="size-5 text-silex" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Your Data. Your Vault.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Every firm gets its own private, sandboxed environment.
                      Your data never leaves your vault. Never shared, never
                      mixed, never exposed.
                    </p>
                  </div>
                </div>
              </Anim>
            </div>
          </Anim>

          {/* ──────────── VALUE PROPS (right side) ──────────── */}
          <div className="flex-1 flex flex-col justify-center gap-4">
            {VALUE_PROPS.map((prop, i) => (
              <Anim
                key={prop.title}
                delay={T_VALUE_PROPS + i * 250}
                animation="animate-in fade-in slide-in-from-right-8 duration-600"
              >
                <div className="rounded-xl border bg-card shadow-sm px-6 py-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-silex/10 shrink-0 mt-0.5">
                      <prop.icon className="size-5 text-silex" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold mb-1">
                        {prop.title}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {prop.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
