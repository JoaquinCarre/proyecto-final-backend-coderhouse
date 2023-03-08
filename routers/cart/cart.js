import { Router } from 'express';
import { indexCart, createCart, getCart, addProductToCart, addSameProduct, deleteCart, deleteProductFromCart, buyCart, newOrder } from '../../controllers/cartController.js';
import { verifyToken } from '../../config/jwt.js';

const router = Router();

router.get('/', verifyToken, indexCart)
router.post('/', verifyToken, createCart)
router.get('/:email', verifyToken, getCart)
router.post('/:id', verifyToken, addProductToCart)
router.put('/:id', verifyToken, addSameProduct)
router.delete('/:id', verifyToken, deleteCart)
router.delete('/:id/:product_id', verifyToken, deleteProductFromCart)
router.post('/:cart_id/:user_id', verifyToken, buyCart)
router.post('/order/new/:id', verifyToken, newOrder);

export default router;