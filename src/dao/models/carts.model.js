const mongoose = require('mongoose')
const collection = "cart"

const cartSchema = new mongoose.Schema({
    products:{
        type : [
            {
                productId : {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"product"
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        default :[]
    }
})
cartSchema.pre("find", function () {
    this.populate('products.productId')
    //next()
})

const CartModel = new mongoose.model(collection, cartSchema)
module.exports = CartModel