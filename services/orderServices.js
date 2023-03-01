import { orderInstance } from "../models/dao/indexDAO.js";
import { logger } from "../logs/logger.js";

async function getOrder(id) {
  try {
    return await orderInstance.getOneById(id);
  } catch (err) {
    logger.error("No es posible obtener la orden de compra", err);
  }
}

async function addNewOrder(order) {
  try {
    await orderInstance.create(order);
  } catch (err) {
    logger.error("No es posible guardar la orden de compra", err);
  }
}

async function getOrders() {
  try {
    return await orderInstance.getAll();
  } catch (err) {
    logger.error(
      "No es posible obtener la lista de usuarios registrados ",
      err
    );
  }
}

export default {
  getOrder,
  addNewOrder,
  getOrders,
};
