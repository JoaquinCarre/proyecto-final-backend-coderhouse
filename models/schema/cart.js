import mongoose, { Schema } from 'mongoose';

const cart = new Schema({
    timestamp: { type: Date, default: Date.now },
    products: [new Schema({
        title: { type: String, required: true },
        price: { type: Number },
        thumbnail: { type: String },
        quantity: { type: Number }
    })
    ]
})

export default mongoose.model('Cart', cart);