import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FlowCanvas } from './components/canvas/FlowCanvas';
import { AgentPalette } from './components/layout/AgentPalette';
import { AIConfigAssistant } from './components/layout/AIConfigAssistant';
import { VoiceTestPanel } from './components/voice/VoiceTestPanel';
import { Bot } from 'lucide-react';
import { useAgents } from './hooks/useAgents';
import { wsService } from './services/websocketService';
import { useAgentStore } from './stores/agentStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  const { isLoading } = useAgents();
  const { updateAgent, deleteAgent, addAgent } = useAgentStore();

  useEffect(() => {
    // Connect to WebSocket
    const socket = wsService.connect();

    // Listen for real-time updates
    wsService.onAgentCreated((data) => {
      console.log('Agent created:', data);
      if (data.agent) {
        addAgent(data.agent);
      }
    });

    wsService.onAgentUpdated((data) => {
      console.log('Agent updated:', data);
      if (data.agentId) {
        updateAgent(data.agentId, data);
      }
    });

    wsService.onAgentDeleted((data) => {
      console.log('Agent deleted:', data);
      if (data.agentId) {
        deleteAgent(data.agentId);
      }
    });

    wsService.onPersonaChanged((data) => {
      console.log('Persona changed:', data);
      if (data.agentId) {
        // Flash animation
        const node = document.querySelector(`[data-id="${data.agentId}"]`);
        if (node) {
          node.classList.add('persona-flash');
          setTimeout(() => node.classList.remove('persona-flash'), 500);
        }
      }
    });

    return () => {
      wsService.disconnect();
    };
  }, [updateAgent, deleteAgent, addAgent]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <Bot size={48} className="mx-auto mb-4 text-blue-500 animate-pulse" />
          <p className="text-gray-600">Loading FlowOne Voice...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
            <Bot size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold">FlowOne Voice</h1>
            <p className="text-xs text-gray-500">Voice-Configured AI Agents</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Demo Mode</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        <AgentPalette />
        <FlowCanvas />
      </div>

      {/* Floating panels */}
      <AIConfigAssistant />
      <VoiceTestPanel />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
