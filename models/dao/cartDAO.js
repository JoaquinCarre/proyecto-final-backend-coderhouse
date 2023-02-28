import MongoDBContainer from './containers/mongoDBContainer.js';
import cartModel from '../schema/cart.js';
import { logger } from '../../logs/logger.js';

let cartInstance = null;

export default class CartDAO extends MongoDBContainer {
    constructor(model) {
        super(model);
        this.model = model;
    }

    async updateCartById(idCart, prod) {
        try {
            return this.model.findOneAndUpdate({ _id: idCart }, { $push: { products: prod }});
        } catch (err) {
            logger.error('No es posible actualizar el carrito en la base de datos ', err);
        }
    }

    async updateQuantityOfAProduct (id, prod) {
        try {
            return this.model.findOneAndUpdate({ _id: id, "products._id": prod._id}, { $inc: { "products.$.quantity": 1 }});
        } catch (err) {
            logger.error('No es posible actualizar el producto del carrito ', err);
        }
    }

    async deleteProductByIdFromCart (id, product_id) {
        try {
            return await this.model.updateOne({ _id: id }, { $pull: { products: { _id: product_id } } });  
        } catch (err) {
            logger.error('No es posible eliminar el producto del carrito ', err);
        }
    }

    static getInstance() {
        if (!cartInstance) {
            cartInstance = new CartDAO(cartModel);
        }
        return cartInstance
    }
}