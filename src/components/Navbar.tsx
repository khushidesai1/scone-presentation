import { useState } from "react";
import { Scale, User, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDemoSettings } from "@/contexts/DemoSettings";
import { SettingsModal } from "@/components/SettingsModal";

interface NavbarProps {
  onLogoClick: () => void;
}

export function Navbar({ onLogoClick }: NavbarProps) {
  const { settings } = useDemoSettings();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center border-b bg-background px-5">
        {/* Left: logo */}
        <button
          type="button"
          onClick={onLogoClick}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-70"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Scale className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-base font-semibold tracking-tight">
            Silex AI
          </span>
        </button>

        {/* Center: firm name */}
        <div className="flex-1 text-center">
          <span className="text-sm text-muted-foreground">
            {settings.firmName || "ACME Inc."}
          </span>
        </div>

        {/* Right: user menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-colors hover:bg-accent">
            <User className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
