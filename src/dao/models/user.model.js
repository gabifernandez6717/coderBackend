const mongoose = require('mongoose')
const collection = "user"

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password:{
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"cart"
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
})

const userModel = new mongoose.model(collection, userSchema)
module.exports = userModel