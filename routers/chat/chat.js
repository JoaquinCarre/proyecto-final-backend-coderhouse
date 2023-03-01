import { Router } from 'express';
import { indexChat, getChatsByEmail } from '../../controllers/chatController.js';
import { verifyToken } from '../../config/jwt.js';

const router = Router();

router.get('/', verifyToken, indexChat)
router.get('/:email', getChatsByEmail)

export default router;