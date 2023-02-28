export default class cartDTO {
    constructor(products) {
        this._id = products._id
        this.products = products.products;
    }
}