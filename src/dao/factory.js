const ProductMongoDBDAO = require("./db/product.dao.js")
const productFileSystemDAO = require("./fs/products.dao.js")
const config = require("../config/config.js")
let DAO = ""

switch (config.MODE) {
    case "desarrollo":
        DAO = new ProductMongoDBDAO()
        break;
    case "produccion":
        DAO = new productFileSystemDAO ("../dao/fs/json/products.json")
    break;
    default:
        console.log("Persistencia Ivalida");
        break;
}
module.exports = DAO