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

    //Obtener los carts
    async getCart (limit, page) {
            try {
                const carts = await CartModel.paginte({limit: limit ? limit: 5},{ page: page ? page: 1 })
                console.log(JSON.stringify(carts,null,2))
                return carts
            } catch (error) {
                res.status(500).send("error interno del servidor.")
                console.log(error);
            }
    }

    //Obtener un cart por su id
    async getCart (id) {
        if (id) {
            try {
                const cart = await CartModel.findById(id)
                console.log(JSON.stringify(cart,null,2));
                res.status(200).send(cart)
            } catch (error) {
                res.status(500).send("error interno del servidor.")
                console.log(error);
            }
        } else {
            res.status(404).send("Proporcione un id valido.")
        }
    }
        //Agregar un carrito
        async createCart(cartData, product){
        console.log(cartData);
        try {
            if (product) {
                const cart = new CartModel(cartData)
                cart.products.push({productId: product})
                await this.guardarCambio(cart)
                console.log(JSON.stringify(cart,null,2));
                res.status(200).send("Cart creado correctamente " + cart)
            } else {
                const cart = new CartModel(cartData)
                await cart.save()
                console.log(cart);
                res.status(200).send("Cart creado correctamente " + cart)
            }
        } catch (error) {
            res.status(500).send("error interno del servidor.")
            console.log(error);
        }
    }
    //Actualizar un cart por su id
    async updateCart (id, cartUpdated){
        try {
            const carts = await CartModel.findByIdAndUpdate(id,cartUpdated)
            res.status(200).send("Cart actualizado correctamente "+carts)
        } catch (error) {
            console.log(error);
        }
    }

    //Agregar un producto a un cart
    async addProductToCart(cartId, productId){
        console.log("aca llego: "+cartId);
        console.log("aca llego: "+productId);
        console.log(typeof cartId);
        if (cartId && productId) {
            try {
            const cart = await CartModel.findById("66985ca288bf69f09975e577")
            console.log(cart);
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

    //Eliminar un cart por su id
    async deleteCart (id) {
        if (id) {
            try {
            const cart = CartModel.findByIdAndDelete(id)
            res.status(200).send("Cart eliminado correctamente "+cart)
            return (`Cart con id ${id} eliminado correctamente. \n${JSON.stringify(carts,null,2)}`)
            } catch (error) {
                res.status(500).send("error interno del servidor.")
                console.log(error);
            }
        } else {
            console.log("Debe proporcionar un id");
        }
    }
}

module.exports = CartManager