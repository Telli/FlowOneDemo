import { Router } from 'express';
import { chatController } from '../controllers/chatController';

const router = Router();

// Configuration chat
router.post('/config', (req, res) => chatController.handleConfigChat(req, res));

// Agent testing
router.post('/test', (req, res) => chatController.testAgent(req, res));

// Persona adaptation
router.post('/adapt-persona', (req, res) => chatController.adaptPersona(req, res));

export default router;
