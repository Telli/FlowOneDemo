import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { useAgentStore } from '../stores/agentStore';
import { Agent } from '../types';

export const useAgents = () => {
  const queryClient = useQueryClient();
  const { setAgents, addAgent, updateAgent as updateAgentStore, deleteAgent: deleteAgentStore } = useAgentStore();

  const { data: agents, isLoading } = useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const agents = await api.getAgents();
      setAgents(agents);
      return agents;
    },
  });

  const createMutation = useMutation({
    mutationFn: (agent: Partial<Agent>) => api.createAgent(agent),
    onSuccess: (newAgent) => {
      addAgent(newAgent);
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Agent> }) =>
      api.updateAgent(id, updates),
    onSuccess: (updatedAgent) => {
      updateAgentStore(updatedAgent.id, updatedAgent);
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteAgent(id),
    onSuccess: (_, id) => {
      deleteAgentStore(id);
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });

  return {
    agents,
    isLoading,
    createAgent: createMutation.mutate,
    updateAgent: updateMutation.mutate,
    deleteAgent: deleteMutation.mutate,
  };
};
