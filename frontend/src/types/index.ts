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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AgentConnection {
  id: string;
  source: string;
  target: string;
  type: 'default' | 'conditional';
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface ConfigChatResponse {
  success: boolean;
  action: 'create' | 'modify' | 'delete' | 'query';
  agent?: Agent;
  message: string;
}

export interface TestAgentResponse {
  success: boolean;
  conversationId: string;
  response: string;
}
