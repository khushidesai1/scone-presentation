import { Search, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabbedInputHeaderProps {
  activeTab: "search" | "chat";
  onTabChange: (tab: "search" | "chat") => void;
}

const tabs = [
  { id: "search" as const, label: "Search", icon: Search },
  { id: "chat" as const, label: "Chat", icon: MessageSquare },
];

export function TabbedInputHeader({ activeTab, onTabChange }: TabbedInputHeaderProps) {
  return (
    <div className="flex items-center gap-1 rounded-t-2xl border-b px-4 pt-3 pb-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex items-center gap-1.5 px-3 pb-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
            activeTab === tab.id
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          <tab.icon className="h-3.5 w-3.5" />
          {tab.label}
        </button>
      ))}
    </div>
  );
}
