import { Router } from 'express';
import { indexInfo } from '../../controllers/infoController.js'

const router = Router();

router.get('/info', indexInfo)

export default router;