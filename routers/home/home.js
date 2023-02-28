import { Router } from 'express';
import { logger } from '../../logs/logger.js';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const cookies = req.cookies.token
        if (cookies) {
            res.redirect('/productos');
        } else {
            res.render('index');
        }
        res.render('index');
    } catch (err) {
        logger.error(`${err.message}`);
        next(err);
    }
});

export default router;