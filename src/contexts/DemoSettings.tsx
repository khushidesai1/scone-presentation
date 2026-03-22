import { createContext, useCallback, useContext, useState } from "react";

export interface DemoSettings {
  firstName: string;
  firmName: string;
}

interface DemoSettingsContextValue {
  settings: DemoSettings;
  updateSettings: (patch: Partial<DemoSettings>) => void;
}

const DemoSettingsContext = createContext<DemoSettingsContextValue | null>(null);

const DEFAULTS: DemoSettings = {
  firstName: "",
  firmName: "ACME Inc.",
};

export function DemoSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<DemoSettings>(DEFAULTS);

  const updateSettings = useCallback((patch: Partial<DemoSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  return (
    <DemoSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </DemoSettingsContext.Provider>
  );
}

export function useDemoSettings() {
  const ctx = useContext(DemoSettingsContext);
  if (!ctx) throw new Error("useDemoSettings must be used within DemoSettingsProvider");
  return ctx;
}
