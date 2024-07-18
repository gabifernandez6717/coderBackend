const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')
const collection = "product"

const productSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    title: {
        type: String,
        index: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        index: true,
        required: true
    }
})
productSchema.plugin(paginate)
const ProductModel = new mongoose.model(collection, productSchema)
module.exports = ProductModel