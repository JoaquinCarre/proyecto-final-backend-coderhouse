import CartRepository from "../models/repository/cartRepository.js";
import { logger } from "../logs/logger.js";

const repository = new CartRepository();

async function getCarts() {
  try {
    return await repository.getAllShopCarts();
  } catch (err) {
    logger.error("No es posible obtener los carritos de la base de datos ", err);
  }
}
//CONTINUAR CON EL RESTO DE LAS FUNCIONES Y VER SI FALTA ALGUNA
async function createANewCart(data) {
  try {
    return await repository.createNew(data);
  } catch (err) {
    logger.error("No es posible crear el carrito", err);
  }
}

async function getCartByid(id) {
  try {
    return await repository.getACartByid(id);
  } catch (err) {
    logger.error("No es posible obtener el producto ", err);
  }
}

async function uploadCartById(idCart, prod) {
  try {
    return await repository.updateCart(idCart, prod);
  } catch (err) {
    logger.error("No es posible borrar el producto ", err);
  }
}

async function uploadCartQuantity(id, prod) {
  try {
    return await repository.updateQuantityProduct(id, prod);
  } catch (err) {
    logger.error("No es posible borrar el producto ", err);
  }
}

async function deleteCartById(id) {
  try {
    return await repository.deleteACart(id);
  } catch (err) {
    logger.error("No es posible borrar el producto ", err);
  }
}
async function deleteItemById(id, product_id) {
  try {
    return await repository.deleteProduct(id, product_id);
  } catch (err) {
    logger.error("No es posible borrar el producto ", err);
  }
}

export default {
    getCarts,
    createANewCart,
    getCartByid,
    uploadCartById,
    uploadCartQuantity,
    deleteCartById,
    deleteItemById,
};