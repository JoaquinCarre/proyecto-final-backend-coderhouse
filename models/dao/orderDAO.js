import MongoDBContainer from './containers/mongoDBContainer.js';
import orderModel from '../schema/buyOrder.js';

let orderInstance = null;

export default class OrderDAO extends MongoDBContainer {
    constructor(model) {
        super(model);
    }

    static getInstance() {
        if (!orderInstance) {
            orderInstance = new OrderDAO(orderModel);
        }
        return orderInstance
    }
}