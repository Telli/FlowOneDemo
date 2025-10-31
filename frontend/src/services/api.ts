import axios from 'axios';
import { Agent, ConfigChatResponse, TestAgentResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Agent CRUD
  async getAgents(): Promise<Agent[]> {
    const response = await apiClient.get('/agents');
    return response.data.agents;
  },

  async getAgent(id: string): Promise<Agent> {
    const response = await apiClient.get(`/agents/${id}`);
    return response.data.agent;
  },

  async createAgent(agent: Partial<Agent>): Promise<Agent> {
    const response = await apiClient.post('/agents', agent);
    return response.data.agent;
  },

  async updateAgent(id: string, updates: Partial<Agent>): Promise<Agent> {
    const response = await apiClient.patch(`/agents/${id}`, updates);
    return response.data.agent;
  },

  async deleteAgent(id: string): Promise<void> {
    await apiClient.delete(`/agents/${id}`);
  },

  // Configuration chat
  async configChat(message: string, conversationHistory: any[] = []): Promise<ConfigChatResponse> {
    const response = await apiClient.post('/chat/config', {
      message,
      conversationHistory,
    });
    return response.data;
  },

  // Agent testing
  async testAgent(agentId: string, message: string, conversationId?: string): Promise<TestAgentResponse> {
    const response = await apiClient.post('/chat/test', {
      agentId,
      message,
      conversationId,
    });
    return response.data;
  },

  // Persona adaptation
  async adaptPersona(agentId: string, newPersona: string): Promise<{ success: boolean; agent: Agent }> {
    const response = await apiClient.post('/chat/adapt-persona', {
      agentId,
      newPersona,
    });
    return response.data;
  },
};
