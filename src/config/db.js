const { mongoose } = require("mongoose");
const configObject = require("./config.js")
const {PORT, MODE, MONGO_URL} = configObject
class database {
    static #instancia
    constructor(){
        mongoose.connect(MONGO_URL)
    }
    static connect (){
        if (this.#instancia) {
            console.log("Ya hubo una conexion previa");
            return this.#instancia
        } else {
            this.#instancia = new database()
            console.log(`Conectado a la base de datos de ${MODE} en port ${PORT}`);
            return this.#instancia
        }
    }
}
module.exports = database