const dotenv = require('dotenv')
const program = require("../utils/commander.js");
const {mode} = program.opts()
dotenv.config({
    path: mode === "desarrollo" ? "./.env.desarrollo": "./.env.produccion",
})
module.exports = {
    PORT: process.env.PORT,
    MODE: process.env.MODE,
    MONGO_URL: process.env.MONGO_URL
}