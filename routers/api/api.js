import { Router } from 'express';
import { indexInfo } from '../../controllers/infoController.js'
import { getAllCarts } from '../../controllers/cartController.js';
import { verifyToken } from '../../config/jwt.js';

const router = Router();

router.get('/info', indexInfo)
router.get('/carritos', verifyToken, getAllCarts)

export default router;