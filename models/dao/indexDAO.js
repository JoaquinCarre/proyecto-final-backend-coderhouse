import MessageDAO from './messageDAO.js';
import ProductDAO from './productDAO.js';
import UserDAO from './userDAO.js';
import CartDAO from './cartDAO.js';

const messageInstance = MessageDAO.getInstance();
const productInstance = ProductDAO.getInstance();
const userInstance = UserDAO.getInstance();
const cartInstance = CartDAO.getInstance();

export { messageInstance, productInstance, userInstance, cartInstance };