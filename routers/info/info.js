import { Router } from 'express';
import { indexInfo } from '../../controllers/infoController.js'

const router = Router();

router.get('/', indexInfo)

export default router;