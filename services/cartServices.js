import CartRepository from "../models/repository/cartRepository.js";

const repository = new CartRepository();

async function getCarts() {
    return await repository.getAllShopCarts();
}
//CONTINUAR CON EL RESTO DE LAS FUNCIONES Y VER SI FALTA ALGUNA
async function createANewCart(data) {
    return await repository.createNew(data);
}

async function getCartByid(id) {
    return await repository.getACartByid(id);
}

async function uploadCartById(idCart, prod) {
    return await repository.updateCart(idCart, prod);
}

async function uploadCartQuantity(id, prod) {
    return await repository.updateQuantityProduct(id, prod);
}

async function deleteCartById(id) {
    return await repository.deleteACart(id);
}

async function deleteItemById(id, product_id) {
    return await repository.deleteProduct(id, product_id);
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