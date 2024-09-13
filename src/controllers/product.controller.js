const ProductManager = require("../dao/db/manager/product.manager.js")
const productManager = new ProductManager()

class ProductController {
    async getProducts(req, res){
        const {limit,page,query,value,sort} = req.query
        try {
            const products = await productManager.getProducts(limit,page,query,value,sort)
            res.json(products).status(200)
        } catch (error) {
            res.send("Error del servidor", error).status(500)
        }
    }
    async getProductById (req, res){
        const id = req.params.id
        try {
            const product = await productManager.getProductById(id)
            res.json(product).status(200)
        } catch (error) {
            res.send("Error del servidor", error).status(500)
        }
    }
    async addProduct (req, res){
        try {
            const product = await productManager.addProduct(req.body)
            res.json(product).status(200)
        } catch (error) {
            res.send("Error del servidor", error).status(500)
        }
    }
    async editedProduct (req, res){
        const id = req.params.id
        try {
            const products = await productManager.editedProduct(id, req.body)
            res.json(products).status(200)
        } catch (error) {
            res.send("Error del servidor", error).status(500)
        }
    }
    async deleteProductById(req, res){
        const id = req.params.id
        try {
            const products = await productManager.deleteProduct(id)
            res.json(products).status(200)
        } catch (error) {
            res.send("Error del servidor", error).status(500)
        }
    }
}
module.exports = ProductController