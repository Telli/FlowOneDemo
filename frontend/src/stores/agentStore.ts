import { create } from 'zustand';
import { Agent } from '../types';

interface AgentStore {
  agents: Agent[];
  selectedAgent: Agent | null;
  isTestingMode: boolean;
  addAgent: (agent: Agent) => void;
  setAgents: (agents: Agent[]) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  deleteAgent: (id: string) => void;
  selectAgent: (agent: Agent | null) => void;
  setTestingMode: (isTestingMode: boolean) => void;
}

export const useAgentStore = create<AgentStore>((set) => ({
  agents: [],
  selectedAgent: null,
  isTestingMode: false,
  addAgent: (agent) => set((state) => ({ agents: [...state.agents, agent] })),
  setAgents: (agents) => set({ agents }),
  updateAgent: (id, updates) =>
    set((state) => ({
      agents: state.agents.map((a) => (a.id === id ? { ...a, ...updates } : a)),
      selectedAgent: state.selectedAgent?.id === id
        ? { ...state.selectedAgent, ...updates }
        : state.selectedAgent,
    })),
  deleteAgent: (id) =>
    set((state) => ({
      agents: state.agents.filter((a) => a.id !== id),
      selectedAgent: state.selectedAgent?.id === id ? null : state.selectedAgent,
    })),
  selectAgent: (agent) => set({ selectedAgent: agent }),
  setTestingMode: (isTestingMode) => set({ isTestingMode }),
}));
