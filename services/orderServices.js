import { orderInstance } from "../models/dao/indexDAO.js";

async function getOrder(id) {
  return await orderInstance.getOneById(id);
}

async function addNewOrder(order) {
  await orderInstance.create(order);
}

async function getOrders() {
  return await orderInstance.getAll();
}

export default {
  getOrder,
  addNewOrder,
  getOrders,
};
