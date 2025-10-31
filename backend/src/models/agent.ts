import { v4 as uuidv4 } from 'uuid';

export interface Agent {
  id: string;
  name: string;
  persona: string;
  systemPrompt: string;
  voice: string;
  tools: string[];
  tags: string[];
  position: { x: number; y: number };
  status: 'new' | 'configured' | 'testing' | 'error';
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentConnection {
  id: string;
  source: string;
  target: string;
  type: 'default' | 'conditional';
}

export interface Conversation {
  id: string;
  agentId: string;
  messages: ConversationMessage[];
  createdAt: Date;
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// In-memory storage for demo (replace with DB in production)
export class AgentStore {
  private agents: Map<string, Agent> = new Map();
  private connections: Map<string, AgentConnection> = new Map();
  private conversations: Map<string, Conversation> = new Map();

  createAgent(agent: Omit<Agent, 'id' | 'createdAt' | 'updatedAt'>): Agent {
    const newAgent: Agent = {
      ...agent,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.agents.set(newAgent.id, newAgent);
    return newAgent;
  }

  getAgent(id: string): Agent | undefined {
    return this.agents.get(id);
  }

  getAllAgents(): Agent[] {
    return Array.from(this.agents.values());
  }

  updateAgent(id: string, updates: Partial<Agent>): Agent | undefined {
    const agent = this.agents.get(id);
    if (!agent) return undefined;

    const updatedAgent = { ...agent, ...updates, updatedAt: new Date() };
    this.agents.set(id, updatedAgent);
    return updatedAgent;
  }

  deleteAgent(id: string): boolean {
    return this.agents.delete(id);
  }

  // Connection methods
  createConnection(connection: Omit<AgentConnection, 'id'>): AgentConnection {
    const newConnection: AgentConnection = {
      ...connection,
      id: uuidv4(),
    };
    this.connections.set(newConnection.id, newConnection);
    return newConnection;
  }

  getConnections(): AgentConnection[] {
    return Array.from(this.connections.values());
  }

  deleteConnection(id: string): boolean {
    return this.connections.delete(id);
  }

  // Conversation methods
  createConversation(agentId: string): Conversation {
    const conversation: Conversation = {
      id: uuidv4(),
      agentId,
      messages: [],
      createdAt: new Date(),
    };
    this.conversations.set(conversation.id, conversation);
    return conversation;
  }

  addMessage(conversationId: string, message: ConversationMessage): void {
    const conversation = this.conversations.get(conversationId);
    if (conversation) {
      conversation.messages.push(message);
    }
  }

  getConversation(id: string): Conversation | undefined {
    return this.conversations.get(id);
  }

  getAgentConversations(agentId: string): Conversation[] {
    return Array.from(this.conversations.values()).filter(
      conv => conv.agentId === agentId
    );
  }
}

export const agentStore = new AgentStore();
