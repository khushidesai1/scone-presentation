import { useState, useCallback } from "react";
import {
  AssistantRuntimeProvider,
  useLocalRuntime,
} from "@assistant-ui/react";
import { legalChatAdapter } from "@/lib/chat-adapter";
import { ChatThread } from "@/components/ChatThread";
import { LegalResearchToolUI } from "@/components/WorkingSteps";
import { SearchView } from "@/components/SearchView";
import { Navbar } from "@/components/Navbar";
import { DemoSettingsProvider } from "@/contexts/DemoSettings";
import { Presentation } from "@/components/Presentation";

function AppInner() {
  const [mode, setMode] = useState<"presentation" | "search" | "chat">(
    "presentation",
  );
  const runtime = useLocalRuntime(legalChatAdapter, {
    maxSteps: 10,
  });

  const goHome = useCallback(() => setMode("search"), []);

  if (mode === "presentation") {
    return <Presentation onFinish={() => setMode("search")} />;
  }

  if (mode === "search") {
    return (
      <div className="flex h-dvh flex-col bg-background text-foreground">
        <Navbar onLogoClick={goHome} />
        <SearchView onSwitchToChat={() => setMode("chat")} />
      </div>
    );
  }

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <LegalResearchToolUI />
      <div className="flex h-dvh flex-col bg-background text-foreground">
        <Navbar onLogoClick={goHome} />
        <ChatThread onSwitchToSearch={() => setMode("search")} />
      </div>
    </AssistantRuntimeProvider>
  );
}

function App() {
  return (
    <DemoSettingsProvider>
      <AppInner />
    </DemoSettingsProvider>
  );
}

export default App;
