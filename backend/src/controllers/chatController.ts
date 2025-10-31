import { Request, Response } from 'express';
import { aiService } from '../services/aiService';
import { agentStore } from '../models/agent';

export class ChatController {
  /**
   * Handle configuration chat messages
   */
  async handleConfigChat(req: Request, res: Response) {
    try {
      const { message, conversationHistory = [] } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const result = await aiService.interpretConfigRequest(
        message,
        conversationHistory
      );

      // If action is "create", create the agent
      if (result.action === 'create' && result.agent) {
        const newAgent = agentStore.createAgent({
          ...result.agent,
          position: { x: 400, y: 200 },
          status: 'configured',
        });

        res.json({
          success: true,
          action: 'create',
          agent: newAgent,
          message: result.explanation,
        });
      } else if (result.action === 'modify' && result.agent) {
        // Handle modification (requires agent ID)
        const agentId = req.body.agentId;
        if (agentId) {
          const updated = agentStore.updateAgent(agentId, result.agent);
          res.json({
            success: true,
            action: 'modify',
            agent: updated,
            message: result.explanation,
          });
        } else {
          res.json({
            success: true,
            action: 'query',
            message: 'Which agent would you like to modify?',
          });
        }
      } else {
        // Query or clarification needed
        res.json({
          success: true,
          action: 'query',
          message: result.explanation,
        });
      }
    } catch (error) {
      console.error('Config chat error:', error);
      res.status(500).json({ error: 'Failed to process configuration request' });
    }
  }

  /**
   * Test an agent with a message
   */
  async testAgent(req: Request, res: Response) {
    try {
      const { agentId, message, conversationId } = req.body;

      if (!agentId || !message) {
        return res.status(400).json({ error: 'Agent ID and message are required' });
      }

      const agent = agentStore.getAgent(agentId);
      if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
      }

      // Get or create conversation
      let conversation = conversationId
        ? agentStore.getConversation(conversationId)
        : agentStore.createConversation(agentId);

      if (!conversation) {
        conversation = agentStore.createConversation(agentId);
      }

      // Add user message
      agentStore.addMessage(conversation.id, {
        role: 'user',
        content: message,
        timestamp: new Date(),
      });

      // Get conversation history for Claude
      const history = conversation.messages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      // Run agent
      const response = await aiService.runAgent(agent, message, history);

      // Add assistant message
      agentStore.addMessage(conversation.id, {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      });

      res.json({
        success: true,
        conversationId: conversation.id,
        response,
      });
    } catch (error) {
      console.error('Test agent error:', error);
      res.status(500).json({ error: 'Failed to test agent' });
    }
  }

  /**
   * Adapt agent persona in real-time
   */
  async adaptPersona(req: Request, res: Response) {
    try {
      const { agentId, newPersona } = req.body;

      if (!agentId || !newPersona) {
        return res.status(400).json({ error: 'Agent ID and new persona are required' });
      }

      const agent = agentStore.getAgent(agentId);
      if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
      }

      // Use AI to adapt the system prompt
      const newSystemPrompt = await aiService.adaptPersona(
        agent.systemPrompt,
        newPersona
      );

      // Update agent
      const updated = agentStore.updateAgent(agentId, {
        persona: newPersona,
        systemPrompt: newSystemPrompt,
      });

      res.json({
        success: true,
        agent: updated,
      });
    } catch (error) {
      console.error('Adapt persona error:', error);
      res.status(500).json({ error: 'Failed to adapt persona' });
    }
  }
}

export const chatController = new ChatController();
