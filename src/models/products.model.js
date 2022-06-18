const { Schema, model } = require('mongoose')

const Product = new Schema({

    title: {
        type: String,
    },
    description: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        required: true
    },
    price:{
        type: Number
    },
    stock: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})


module.exports = model('Product', Product)