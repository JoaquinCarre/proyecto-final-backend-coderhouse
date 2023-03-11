import { Router } from 'express';
import { verifyToken } from '../../config/jwt.js';
import {
    getAllProducts,
    getByCategory,
    getImageProduct,
    addNewProduct,
    getProduct,
    updateProduct,
    deleteProduct
} from '../../controllers/productController.js';

const router = Router();

router.get('/', verifyToken, getAllProducts);
router.get('/category/:category', getByCategory);
router.get('/images/:id', getImageProduct);
router.post('/', verifyToken, addNewProduct);
router.get('/:id', verifyToken, getProduct);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

export default router;
