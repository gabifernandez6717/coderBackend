const CartModel = require("../../models/carts.model");

class CartManager {
    //Guardar cambios
    async guardarCambio (cart){
        try {
            await cart.save()
        } catch (error) {
            console.log(error);
        }
    }

    //Eliminar productos de un cart por su id
    async deleteProductToCart (cid, pid) {
    try {
            const cart = await CartModel.findById(cid)
            const cartNew = cart.products.filter(product => product.productId != pid)
            cart.products = cartNew
            await cart.save()
            return cart
        } catch (error) {
            console.log(error);
        }
    }
    //Actualizar un cart por su id
    async updateCart (id, cartUpdated){
        try {
            const cart = await CartModel.findByIdAndUpdate(id,cartUpdated)
            return cart
        } catch (error) {
            console.log(error);
        }
    }
//Actualizar la cantidad de products de un cart
    async updateProductsToCart (cid, pid, quantity){
        if (cid && pid && quantity) {
            try {
                let cart = await CartModel.findById(cid)
                const productUpdated = cart.products.find(product => product.productId=pid)
                productUpdated.quantity = quantity.quantity
                await cart.save()
                return cart
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Proporcione un informacion valida.");
            return false
        }
    }
//Eliminar los product de un cart por su id
async deleteProductsToCart (cid){
    try {
        const cart = await CartModel.findById(cid)
        cart.products =[]
        console.log(cart);
        await cart.save()
        return cart
    } catch (error) {
        console.log(error);
    }
}
    //Eliminar un cart por su id
    async deleteCart (id) {
        if (id) {
            try {
            const cart = await CartModel.findByIdAndDelete(id)
            return cart
            } catch (error) {
                res.status(500).send("error interno del servidor.")
                console.log(error);
            }
        } else {
            console.log("Debe proporcionar un id");
        }
    }
    //Obtener los carts
    async getCarts () {
        try {
            const carts = await CartModel.find()
            return carts
        } catch (error) {
            console.log(error);
        }
    }

    //Obtener un cart por su id
    async getCart (id) {
        try {
            const carts = await CartModel.findById(id)
            return carts
        } catch (error) {
            console.log(error);
        }
    }
    //Agregar un carrito
    async createCart(cartData, product){
        if (product) {
            const cart = new CartModel(cartData)
            cart.products.push({productId: product})
            await cart.save()
            return cart
        } else {
            const cart = new CartModel(cartData)
            await cart.save()
            return cart
        }
    }

    //Agregar un producto a un cart
    async addProductToCart(cartId, productId){
        if (cartId && productId) {
            try {
            const cart = await CartModel.findById(cartId)
            const product = cart.products.find(p=> p.productId == productId)
            if (product) {
                product.quantity++
                await this.guardarCambio(cart)
                console.log(JSON.stringify(cart,null,2));
                return`Cantidad del producto con id ${productId} en el cart ${cartId} aumentada, ${cart}`
            } else {
                cart.products.push({productId: productId})
                await this.guardarCambio(cart)
                console.log(JSON.stringify(cart,null,2));
                return`Producto con id ${productId} agregado al cart ${cartId}, ${cart}`
            }
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = CartManager

