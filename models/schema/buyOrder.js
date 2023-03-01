import mongoose, { Schema } from 'mongoose';

const order = new Schema({
    timestamp: { type: Date, default: Date.now },
    id: { type: String },
    products: [new Schema({
        title: { type: String, required: true },
        quantity: { type: Number }
    })
    ]
})

export default mongoose.model('Order', order);