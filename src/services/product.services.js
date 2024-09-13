class ProductService {
    constructor(repositorioProductos) {
        this.repositorioProductos = repositorioProductos
    }
    async getProducts(limit,page,query,value,sort){
        try {
            return await this.repositorioProductos.getProducts(limit,page,query,value,sort)
        } catch (error) {
            res.send("Error del servidor", error)
        }
    }
    async getProductById (id){
        try {
            return await this.repositorioProductos.getProductById(id)
        } catch (error) {
            res.send("Error del servidor", error)
        }
    }
    async addProduct (data){
        try {
            return await this.repositorioProductos.addProduct(data)
        } catch (error) {
            res.send("Error del servidor", error)
        }
    }
    async editedProduct (id,data){
        try {
            return await this.repositorioProductos.editedProduct(id,data)
        } catch (error) {
            res.send("Error del servidor", error)
        }
    }
    async deleteProductById(id){
        try {
            return await this.repositorioProductos.deleteProductById(id)
        } catch (error) {
            res.send("Error del servidor", error)
        }
    }


/*

    async getProducts(limit,page,query,value,sort){
        try {
            const products = await
            res.json(products)
        } catch (error) {
            res.send("Error del servidor", error)
        }
    }
    async getProductById (id){
        try {
            const product = await 
            res.json(product)
        } catch (error) {
            res.send("Error del servidor", error)
        }
    }
    async addProduct (data){
        try {
            const product = await 
            res.json(product)
        } catch (error) {
            res.send("Error del servidor", error)
        }
    }
    async editedProduct (id,data){
        try {
            const products = await 
            res.json(products)
        } catch (error) {
            res.send("Error del servidor", error)
        }
    }
    async deleteProductById(id){
        try {
            const products = await 
            res.json(products)
        } catch (error) {
            res.send("Error del servidor", error)
        }
    }

*/
}
//const productService = new ProductService(new ProductoRepositorio(DAO))
module.exports =  ProductService