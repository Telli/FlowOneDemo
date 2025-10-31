import { Server, Socket } from 'socket.io';
import { agentStore } from '../models/agent';

export function setupWebSocket(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id);

    // Join agent room for updates
    socket.on('join-agent', (agentId: string) => {
      socket.join(`agent-${agentId}`);
      console.log(`Socket ${socket.id} joined agent-${agentId}`);
    });

    // Leave agent room
    socket.on('leave-agent', (agentId: string) => {
      socket.leave(`agent-${agentId}`);
      console.log(`Socket ${socket.id} left agent-${agentId}`);
    });

    // Real-time agent updates
    socket.on('agent-updated', (data) => {
      console.log('Agent updated:', data);
      io.to(`agent-${data.agentId}`).emit('agent-changed', data);
    });

    // Agent created event
    socket.on('agent-created', (data) => {
      console.log('Agent created:', data);
      io.emit('agent-created', data);
    });

    // Agent deleted event
    socket.on('agent-deleted', (data) => {
      console.log('Agent deleted:', data);
      io.emit('agent-deleted', data);
    });

    // Voice streaming (future enhancement)
    socket.on('voice-chunk', (data) => {
      // Handle voice audio chunks
      socket.to(`agent-${data.agentId}`).emit('voice-response', data);
    });

    // Persona change notification
    socket.on('persona-changed', (data) => {
      console.log('Persona changed:', data);
      io.emit('persona-changed', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}
