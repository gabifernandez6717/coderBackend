
const CartManager = require("../dao/db/manager/cart.manager.js")
const ProductManager = require('../dao/db/manager/product.manager.js')
const TicketModel = require("../dao/models/tickets.model.js")
const productManager = new ProductManager()
const cartManager = new CartManager()
class CartController {
    //Eliminar productos de un cart por su id
    async deleteProductToCart (req, res) {
        const {cid, pid} = req.params
            try {
                const cart = await cartManager.deleteProductToCart(cid, pid)
                res.json(cart).status(200)
            } catch (error) {
                res.send("Error del servidor", error).status(500)
            }
        }
        //Actualizar la cantidad de products de un cart
        async updateProductsToCart (req, res){
            const {cid, pid} = req.params
            const quantity = req.body
            try {
                const cart = await cartManager.updateProductsToCart(cid, pid, quantity)
                res.json(cart).status(200)
            } catch (error) {
                res.send("Error del servidor", error).status(500)
            }
        }
        //Eliminar los product de un cart por su id
        async deleteProductsToCart (req, res){
            const {cid} = req.params
            try {
                const cart = await cartManager.deleteProductsToCart(cid)
                res.json(cart).status(200)
            } catch (error) {
                res.send("Error del servidor", error).status(500)
            }
        }
        //Eliminar un cart por su id
        async deleteCart (req, res) {
            const {cid} = req.params
            try {
                const cart = await cartManager.deleteCart(cid)
                res.json(cart).status(200)
            } catch (error) {
                res.send("Error del servidor", error).status(500)
            }
        }
        //Obtener los carts
        async getCarts (req, res) {
            try {
                const carts = await cartManager.getCarts()
                res.json(carts).status(200)
            } catch (error) {
                res.send("Error del servidor", error).status(500)
            }
        }
        //Obtener un cart por su id
        async getCart (req, res) {
            const {cid} = req.params
            try {
                const cart = await cartManager.getCart(cid)
                res.json(cart).status(200)
            } catch (error) {
                res.send("Error del servidor", error).status(500)
            }
        }
        //Agregar un carrito
        async createCart(req, res){
            const cartData = req.body
            const {pid} = req.query
            try {
                const cart = await cartManager.createCart(cartData, pid)
                res.json(cart).status(200)
            } catch (error) {
                res.send("Error del servidor", error).status(500)
            }
        }
        //Agregar un producto a un cart
        async addProductToCart(req, res){
            const {cid, pid} = req.params
            try {
                const cart = await cartManager.addProductToCart(cid, pid)
                res.json(cart).status(200)
            } catch (error) {
                res.send("Error del servidor", error).status(500)
            }
        }
        //Finalizar el proceso de compra
        async purchase (req, res){
            const cid = req.params.cid
            try {
                const cart = await cartManager.getCart(cid)
                if (cart) {
                    const productsCart = cart.products //Se obtienen los productos del cart
                    const productos = await productManager.getAllProducts()
                    const products = productos.docs //Se obtienen los productos disponibles en la db
                    let sinStock = []
                    let conStock = []
                    let amount = 0
                    productsCart.map(product => {
                        const productStock = products.find(products => JSON.stringify(products._id) == JSON.stringify(product.productId))//Por cada producto agregado al carrito se lo busca en la db
                        if (product.quantity > productStock.stock) { //Se verifica filtran los productos con stock acorde al disponible y los no acordes y se los separa en dos arrays distintos
                            sinStock.push(product)
                        }else{
                            conStock.push(product)
                        }
                    })
                    //Los no acordes se guardan en el cart de nuevo
                    await cartManager.updateCart(cid, sinStock)
                    //Los acordes siguen el proceso
                    await Promise.all(conStock.map(async (product) => {
                        const productDB = await productManager.getProductById(product.productId);
                        amount= +productDB.price * product.quantity
                        await productManager.editedProduct(product.productId, { "stock": productDB.stock - product.quantity });
                    }))
                    const ticket = await new TicketModel()
                    ticket.amount=amount
                    ticket.purchase=req.user?req.user.email:"no se encontro un email"
                    await ticket.save()
                    res.status(200).send(ticket)
                } else {
                    res.status(500).json({error: "error interno del servidor."})
                }
            } catch (error) {
                res.status(500).json({error: "error interno del servidor."})
                console.log(error);
            }
        }
}

module.exports = CartController