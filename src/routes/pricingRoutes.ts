import { Router } from 'express';
import { getEstimate } from '../controllers/pricingController';
import { processChat } from '../controllers/chatController';

const router = Router();

router.post('/estimate', getEstimate); // Keeping legacy support
router.post('/chat', processChat);     // New feature

export default router;