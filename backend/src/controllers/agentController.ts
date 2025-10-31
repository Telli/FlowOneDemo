import { Request, Response } from 'express';
import { agentStore } from '../models/agent';

export class AgentController {
  /**
   * Get all agents
   */
  async getAllAgents(req: Request, res: Response) {
    try {
      const agents = agentStore.getAllAgents();
      res.json({ success: true, agents });
    } catch (error) {
      console.error('Get agents error:', error);
      res.status(500).json({ error: 'Failed to fetch agents' });
    }
  }

  /**
   * Get single agent
   */
  async getAgent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const agent = agentStore.getAgent(id);

      if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
      }

      res.json({ success: true, agent });
    } catch (error) {
      console.error('Get agent error:', error);
      res.status(500).json({ error: 'Failed to fetch agent' });
    }
  }

  /**
   * Create new agent
   */
  async createAgent(req: Request, res: Response) {
    try {
      const agentData = req.body;

      // Validate required fields
      if (!agentData.name || !agentData.persona || !agentData.systemPrompt) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newAgent = agentStore.createAgent({
        name: agentData.name,
        persona: agentData.persona,
        systemPrompt: agentData.systemPrompt,
        voice: agentData.voice || 'neutral',
        tools: agentData.tools || [],
        tags: agentData.tags || [],
        position: agentData.position || { x: 250, y: 100 },
        status: agentData.status || 'configured',
      });

      res.json({ success: true, agent: newAgent });
    } catch (error) {
      console.error('Create agent error:', error);
      res.status(500).json({ error: 'Failed to create agent' });
    }
  }

  /**
   * Update agent
   */
  async updateAgent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedAgent = agentStore.updateAgent(id, updates);

      if (!updatedAgent) {
        return res.status(404).json({ error: 'Agent not found' });
      }

      res.json({ success: true, agent: updatedAgent });
    } catch (error) {
      console.error('Update agent error:', error);
      res.status(500).json({ error: 'Failed to update agent' });
    }
  }

  /**
   * Delete agent
   */
  async deleteAgent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = agentStore.deleteAgent(id);

      if (!deleted) {
        return res.status(404).json({ error: 'Agent not found' });
      }

      res.json({ success: true, message: 'Agent deleted' });
    } catch (error) {
      console.error('Delete agent error:', error);
      res.status(500).json({ error: 'Failed to delete agent' });
    }
  }

  /**
   * Get connections
   */
  async getConnections(req: Request, res: Response) {
    try {
      const connections = agentStore.getConnections();
      res.json({ success: true, connections });
    } catch (error) {
      console.error('Get connections error:', error);
      res.status(500).json({ error: 'Failed to fetch connections' });
    }
  }

  /**
   * Create connection
   */
  async createConnection(req: Request, res: Response) {
    try {
      const { source, target, type } = req.body;

      if (!source || !target) {
        return res.status(400).json({ error: 'Missing source or target' });
      }

      const connection = agentStore.createConnection({
        source,
        target,
        type: type || 'default',
      });

      res.json({ success: true, connection });
    } catch (error) {
      console.error('Create connection error:', error);
      res.status(500).json({ error: 'Failed to create connection' });
    }
  }
}

export const agentController = new AgentController();
