import { Router } from 'express';
import { logger } from '../../logs/logger.js';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        res.render('index.handlebars');
    } catch (err) {
        logger.error(`${err.message}`);
        const customError = new Error('Ups! Algo ha salido mal');
        next(customError);
    }
});

export default router;