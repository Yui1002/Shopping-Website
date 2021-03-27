
import ProductRepository from '../Repositories/ProductRepository.js'

class ProductManager {
    constructor() {
        this.Repository = new ProductRepository()
    }

    async getAllProducts() {
        let response = await this.Repository.getAllProductsFromDB()

        return response
    }

    async getSelectedProduct(parameter) {
        let response = await this.Repository.getSelectedProductFromDB(parameter)

        return response
    }

    async addToCart(parameter) {
        let response = await this.Repository.addItemToCart(parameter)
        return response
    }

    async getCartItems() {
        let response = await this.Repository.getCartItemsFromDB()
        return response
    }

    async removeItemsFromCart(items) {
        let response = await this.Repository.removeItemsFromCart(items)
        return response
    }

}

export default ProductManager