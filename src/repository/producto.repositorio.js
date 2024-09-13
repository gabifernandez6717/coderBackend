class ProductoRepositorio{
    constructor(DAO){
        this.dao = DAO
    }
    async getProducts(){
        console.log("router, controller, services y repositorio, lo mas bien", this.dao);
        try {
            const test = await this.dao.getProducts()
            console.log("Test: ",test);
            return test
        } catch (error) {
            res.send("Error del servidor", error)
        }
    }
    async getProductById (id){
        try {
            return await this.dao.getProductById(id)
        } catch (error) {
            res.send("Error del servidor", error)
        }
    }
    async addProduct (){
        try {
            return await this.dao.addProduct()
        } catch (error) {
            res.send("Error del servidor", error)
        }
    }
    async editedProduct (){
        try {
            return await this.dao.editedProduct()
        } catch (error) {
            res.send("Error del servidor", error)
        }
    }
    async deleteProductById(){
        try {
            return await this.dao.deleteProductById()
        } catch (error) {
            res.send("Error del servidor", error)
        }
    }


}
module.exports = ProductoRepositorio