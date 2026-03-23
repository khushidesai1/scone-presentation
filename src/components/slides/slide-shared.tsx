import {
  Building2,
  Bot,
  Users,
  UserRound,
  FileBox,
  FolderOpen,
  Mail,
  Scale,
  Phone,
  MessageSquare,
  FileText,
  HelpCircle,
  XCircle,
  AlertTriangle,
  Upload,
  Unplug,
  Puzzle,
  Mic,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Animation helper                                                   */
/* ------------------------------------------------------------------ */
export function Anim({
  children,
  delay = 0,
  className = "",
  animation = "animate-in fade-in duration-700",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  animation?: string;
}) {
  return (
    <div
      className={`${animation} ${className}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
export const PARTNERS = [
  { initials: "JW" },
  { initials: "SC" },
  { initials: "RK" },
];

export const ASSOCIATES = [
  { initials: "AM" },
  { initials: "LT" },
  { initials: "DP" },
  { initials: "KN" },
  { initials: "SA", isSilex: true },
];

export const TOOLS: { icon: LucideIcon; name: string }[] = [
  { icon: Mic, name: "Client Calls" },
  { icon: FileBox, name: "iManage" },
  { icon: FolderOpen, name: "SharePoint" },
  { icon: Mail, name: "Outlook" },
  { icon: Scale, name: "Westlaw" },
];

export type LineStatus = "broken" | "weak" | "working";

export const CLIENT_FLOWS: {
  icon: LucideIcon;
  label: string;
  sublabel: string;
}[] = [
  { icon: Mail, label: "Email", sublabel: "Contracts & memos" },
  { icon: MessageSquare, label: "Text / Chat", sublabel: "Quick questions" },
  { icon: Phone, label: "Phone", sublabel: "Calls & meetings" },
];

export const FIRM_AI_FLOWS: {
  icon: LucideIcon;
  label: string;
  sublabel: string;
  status: LineStatus;
}[] = [
  { icon: FileBox, label: "iManage", sublabel: "Documents", status: "broken" },
  {
    icon: FolderOpen,
    label: "SharePoint",
    sublabel: "Internal docs",
    status: "weak",
  },
  { icon: Mail, label: "Outlook", sublabel: "Email data", status: "weak" },
  {
    icon: Scale,
    label: "Westlaw",
    sublabel: "Legal research",
    status: "working",
  },
  {
    icon: Mic,
    label: "Client Calls",
    sublabel: "Conversations lost",
    status: "broken",
  },
];

/* ------------------------------------------------------------------ */
/*  Shared small components                                            */
/* ------------------------------------------------------------------ */
export function PersonCircle({ initials }: { initials: string }) {
  return (
    <div className="h-12 w-12 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">
      {initials}
    </div>
  );
}

export function TreeConnector({ delay }: { delay: number }) {
  return (
    <Anim delay={delay} animation="animate-in fade-in duration-400">
      <div className="flex justify-center py-2">
        <div className="w-px h-6 bg-border" />
      </div>
    </Anim>
  );
}

/**
 * Bidirectional flow connector — used between all boxes.
 * `status` controls color and markers (only used for firm↔AI connections).
 */
export function BiDirectionalFlow({
  icon: Icon,
  label,
  sublabel,
  status = "working",
  delay,
}: {
  icon: LucideIcon;
  label: string;
  sublabel: string;
  status?: LineStatus;
  delay: number;
}) {
  const lineColor =
    status === "broken"
      ? "border-destructive/60"
      : status === "weak"
        ? "border-amber-400/50"
        : "border-muted-foreground/40";

  const lineDash = status === "working" ? "" : "border-dashed";

  const arrowLeftColor =
    status === "broken"
      ? "border-r-destructive/60"
      : status === "weak"
        ? "border-r-amber-400/50"
        : "border-r-muted-foreground/40";

  const arrowRightColor =
    status === "broken"
      ? "border-l-destructive/60"
      : status === "weak"
        ? "border-l-amber-400/50"
        : "border-l-muted-foreground/40";

  return (
    <Anim delay={delay} animation="animate-in fade-in duration-500">
      <div className="flex flex-col items-center gap-1">
        {/* Label */}
        <div className="flex items-center gap-2">
          <Icon className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">
            {label}
          </span>
        </div>

        {/* Bidirectional arrow line */}
        <div className="flex items-center w-full px-1 relative">
          <div
            className={`size-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[6px] ${arrowLeftColor} shrink-0`}
          />
          <div className={`flex-1 border-t-2 ${lineDash} ${lineColor}`} />
          <div
            className={`size-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] ${arrowRightColor} shrink-0`}
          />

          {status === "broken" && (
            <Anim
              delay={delay + 400}
              animation="animate-in fade-in zoom-in-50 duration-300"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="bg-background rounded-full">
                <XCircle className="size-5 text-destructive" />
              </div>
            </Anim>
          )}
          {status === "weak" && (
            <Anim
              delay={delay + 400}
              animation="animate-in fade-in zoom-in-50 duration-300"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="bg-background rounded-full">
                <AlertTriangle className="size-4 text-amber-500" />
              </div>
            </Anim>
          )}
        </div>

        {/* Sublabel */}
        <span className="text-sm text-muted-foreground/60">{sublabel}</span>
      </div>
    </Anim>
  );
}

/* ------------------------------------------------------------------ */
/*  Box components                                                     */
/* ------------------------------------------------------------------ */
export function ClientBox({ delay }: { delay: number }) {
  return (
    <Anim
      delay={delay}
      animation="animate-in fade-in slide-in-from-left-8 duration-700"
      className="flex-1"
    >
      <div className="rounded-2xl border bg-card shadow-sm p-7 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
            <UserRound className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold">Client</h2>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          {/* Client avatars */}
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-blue-100 text-blue-600 text-lg font-semibold flex items-center justify-center">
              JM
            </div>
            <div className="h-14 w-14 rounded-full bg-blue-100 text-blue-600 text-lg font-semibold flex items-center justify-center">
              TR
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <div className="flex items-center gap-1.5 mb-2 justify-center">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Deliverables
              </span>
            </div>
            <div className="flex items-center gap-4 justify-center">
              {(
                [
                  { icon: FileText, name: "Contracts" },
                  { icon: HelpCircle, name: "Questions" },
                  { icon: FileText, name: "Documents" },
                ] as const
              ).map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div className="h-11 w-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <item.icon className="size-5 text-blue-400" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Anim>
  );
}

export function LawFirmBox({
  delay,
  partnersDelay,
  tree1Delay,
  associatesDelay,
  tree2Delay,
  toolsDelay,
}: {
  delay: number;
  partnersDelay: number;
  tree1Delay: number;
  associatesDelay: number;
  tree2Delay: number;
  toolsDelay: number;
}) {
  return (
    <Anim
      delay={delay}
      animation="animate-in fade-in duration-700"
      className="flex-1"
    >
      <div className="rounded-2xl border bg-card shadow-sm p-7 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-semibold">Law Firm</h2>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-1">
          {/* Partners */}
          <Anim
            delay={partnersDelay}
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

          <TreeConnector delay={tree1Delay} />

          {/* Associates */}
          <Anim
            delay={associatesDelay}
            animation="animate-in fade-in slide-in-from-top-4 duration-500"
          >
            <div className="flex items-center gap-2 mb-2 justify-center">
              <Users className="size-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Associates
              </span>
            </div>
            <div className="flex items-center gap-3.5 justify-center">
              {ASSOCIATES.map((a) => (
                <PersonCircle key={a.initials} initials={a.initials} />
              ))}
            </div>
          </Anim>

          <TreeConnector delay={tree2Delay} />

          {/* Tools */}
          <Anim
            delay={toolsDelay}
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
                  <div className="h-11 w-11 rounded-xl bg-muted flex items-center justify-center">
                    <tool.icon className="size-5 text-muted-foreground" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </Anim>
        </div>
      </div>
    </Anim>
  );
}

export function ThirdPartyBox({
  delay,
  issuesDelay,
}: {
  delay: number;
  issuesDelay?: number;
}) {
  const issues = [
    { icon: Upload, label: "Manual data upload" },
    { icon: Unplug, label: "Broken integrations" },
    { icon: Puzzle, label: "One size fits all" },
  ];

  return (
    <Anim
      delay={delay}
      animation="animate-in fade-in slide-in-from-right-8 duration-700"
      className="flex-1"
    >
      <div className="rounded-2xl border bg-muted/50 shadow-sm p-7 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted-foreground/20">
            <Bot className="h-5 w-5 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold">3rd Party Software</h2>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-4">
          <p className="text-lg font-medium text-muted-foreground">
            Harvey / Legora / Clio / Ironclad
          </p>

          {/* Issues list inside the box */}
          <div className="flex flex-col gap-2.5 mt-2">
            {issues.map((issue, i) => (
              <Anim
                key={issue.label}
                delay={(issuesDelay ?? delay + 800) + i * 200}
                animation="animate-in fade-in slide-in-from-right-4 duration-400"
              >
                <div className="flex items-center gap-2.5 rounded-lg bg-destructive/8 border border-destructive/15 px-4 py-2.5">
                  <issue.icon className="size-4 text-destructive shrink-0" />
                  <span className="text-sm font-medium text-destructive/80">
                    {issue.label}
                  </span>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </div>
    </Anim>
  );
}
