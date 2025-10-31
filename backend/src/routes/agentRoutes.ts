import { Router } from 'express';
import { agentController } from '../controllers/agentController';

const router = Router();

// Agent CRUD routes
router.get('/', (req, res) => agentController.getAllAgents(req, res));
router.get('/:id', (req, res) => agentController.getAgent(req, res));
router.post('/', (req, res) => agentController.createAgent(req, res));
router.patch('/:id', (req, res) => agentController.updateAgent(req, res));
router.delete('/:id', (req, res) => agentController.deleteAgent(req, res));

// Connection routes
router.get('/connections/all', (req, res) => agentController.getConnections(req, res));
router.post('/connections', (req, res) => agentController.createConnection(req, res));

export default router;
