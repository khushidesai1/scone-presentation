import {
  AssistantRuntimeProvider,
  useLocalRuntime,
} from "@assistant-ui/react";
import { legalChatAdapter } from "@/lib/chat-adapter";
import { ChatThread } from "@/components/ChatThread";
import { LegalResearchToolUI } from "@/components/WorkingSteps";

function App() {
  const runtime = useLocalRuntime(legalChatAdapter, {
    maxSteps: 10,
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <LegalResearchToolUI />
      <div className="h-dvh bg-background text-foreground">
        <ChatThread />
      </div>
    </AssistantRuntimeProvider>
  );
}

export default App;
