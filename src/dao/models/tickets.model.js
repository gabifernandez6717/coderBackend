const mongoose = require('mongoose')
const collection = "ticket"

const ticketSchema = new mongoose.Schema({
    code:{
        type: String,
        default:() =>  `${Math.floor(Math.random() * 10000)}`,
        unique: true
    },
    purchase_datetime: {
        type: String,
        default: () => `Fecha: ${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} Hora: ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    },
    amount:{
        type: Number,
        required: true,
    },
    purchase:{
        type: String,
        required: true
    }
})

const TicketModel = new mongoose.model(collection, ticketSchema)
module.exports = TicketModel