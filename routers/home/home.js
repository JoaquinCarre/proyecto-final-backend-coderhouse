import { Router } from 'express';
import { logger } from '../../logs/logger.js';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const cookies = req.cookies.token
        if (cookies) {
            res.redirect('/api/productos');
        } else {
            res.render('index.handlebars');
        }
        /*         res.render('index.handlebars'); */
    } catch (err) {
        logger.error(`${err.message}`);
        const customError = new Error('Ups! Algo ha salido mal');
        next(customError);
    }
});

export default router;