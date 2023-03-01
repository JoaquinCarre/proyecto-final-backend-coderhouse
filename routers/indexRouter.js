import { Router } from 'express';
import home from './home/home.js';
import users from './users/users.js';
import auth from './users/auth.js';
import products from './products/productsRouter.js';
import cart from './cart/cart.js'
import chat from './chat/chat.js'

const router = Router();

router.use('/', home);
router.use('/users', users);
router.use('/auth', auth);
router.use('/productos', products);
router.use('/carrito', cart);
router.use('/chat', chat)

export default router;