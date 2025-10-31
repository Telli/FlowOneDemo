import { io, Socket } from 'socket.io-client';

const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:3001';

class WebSocketService {
  private socket: Socket | null = null;

  connect() {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.socket = io(WS_URL, {
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinAgent(agentId: string) {
    this.socket?.emit('join-agent', agentId);
  }

  leaveAgent(agentId: string) {
    this.socket?.emit('leave-agent', agentId);
  }

  onAgentCreated(callback: (data: any) => void) {
    this.socket?.on('agent-created', callback);
  }

  onAgentUpdated(callback: (data: any) => void) {
    this.socket?.on('agent-changed', callback);
  }

  onAgentDeleted(callback: (data: any) => void) {
    this.socket?.on('agent-deleted', callback);
  }

  onPersonaChanged(callback: (data: any) => void) {
    this.socket?.on('persona-changed', callback);
  }

  emitAgentUpdated(agentId: string, data: any) {
    this.socket?.emit('agent-updated', { agentId, ...data });
  }

  emitPersonaChanged(agentId: string, newPersona: string) {
    this.socket?.emit('persona-changed', { agentId, newPersona });
  }
}

export const wsService = new WebSocketService();
