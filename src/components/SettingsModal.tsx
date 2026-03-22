import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDemoSettings } from "@/contexts/DemoSettings";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { settings, updateSettings } = useDemoSettings();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Demo Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="e.g. Justin"
              value={settings.firstName}
              onChange={(e) => updateSettings({ firstName: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Personalizes the greeting on the home screen.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="firmName">Law Firm Name</Label>
            <Input
              id="firmName"
              placeholder="ACME Inc."
              value={settings.firmName}
              onChange={(e) => updateSettings({ firmName: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Shown in the top navigation bar.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
