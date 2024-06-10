const fs = require('fs');
class CartManager {
    constructor(path){
        this.path = path//Ruta del archivo
        this.carts = []//Array de carritos
        this.loadCarts()//Cargar carts al inicializar la instancia
        }

    //Cargar carts
    loadCarts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8')
            this.carts = JSON.parse(data)
        } catch (error) {
            // Si hay un error al leer el archivo, se asume que aún no hay carts
            this.carts = []
        }
    }
    //Guardar cambios
    async guardarArchivo (){
        try {
            fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2), (err, data)=>{
                if (err) {
                    console.log("Hubo un error al guardar el archivo");
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    //Agregar un carrito
    async createCart(){
        const idAutoincrementable = this.carts.length+1
            const cart = {
                id: idAutoincrementable,
                products: []
            }
            this.carts.push(cart)
            await this.guardarArchivo()
            return this.carts
    }
    //Agregar un producto a un carrito
    async addProductToCart(cartId, productId){
        if (cartId && productId) {
            const cart = this.carts.find(cart => cart.id === cartId)//Busca el carrrito
            const product = cart.products.find(products=> products.id === productId)//Verifica si el producto ya fue agregado al carrito
            if (!product) {
                const products = cart.products
                products.push({id: productId, quantity: 1})//Si el producto no fue previamente agregado se lo agrega con un quantity = 1
                await this.guardarArchivo()
                return (`Producto con id ${productId} agregado correctamente al carrito con id ${cartId}: \n ${JSON.stringify(cart,null,2)}`)
            } else {
                product.quantity ++ //Si el producto fue previamente agregado se le aumenta el quantity en 1
                await this.guardarArchivo()
                return (`cantidad del producto con id ${productId} en el carrito con id ${cartId} aumentada correctamente: \n ${JSON.stringify(cart,null,2)}`)
            }
        } else {
            console.log(`Todos los campos son obligatorios`);
            return
        }
    }
    //Obtener un carrito por su id
    async getCart (id) {
        if (id) {
            const cart = await this.carts.find(cart => cart.id === id)
            return cart.products
        } else {
            console.log("Debe proporcionar un id");
        }
    }
    //Eliminar un carrito por su id
    async deleteCart (id) {
        if (id) {
            const carts = await this.carts.filter(cart => cart.id !== id)
            this.carts = carts
            await this.guardarArchivo()
            return (`Cart con id ${id} eliminado correctamente. \n${JSON.stringify(carts,null,2)}`)
        } else {
            console.log("Debe proporcionar un id");
        }
    }
}

module.exports = CartManager