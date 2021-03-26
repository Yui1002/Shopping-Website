
import ProductController from '../Controllers/ProductController.js'

class ProductRoutes {
    constructor() {
        this.ProductController = new ProductController()
    }

    applyRouting(app) {
        const homePage = '../views/home.ejs'
        const allProductPage = '../views/allProducts.ejs'
        const selectedProductPage = '../views/product.ejs'
        const cartPage = '../views/cart.ejs'

        app.route('/').get((req, res) => {            
            res.render(homePage, { title: "Home" });
        })
        
        app.route('/allproducts/json').get((async (req, res) => {
            let response = await this.ProductController.getAllProducts()
            res.send(response)
        }))

        app.route('/allproducts').get((req, res) => {
            res.render(allProductPage, { title: "All products" })
        })

        app.route('/allproducts/products/json/:productId').get((async (req, res) => {
            const parameter = req.params.productId
            let response = await this.ProductController.getSelectedProduct(parameter)
            res.send(response)
        }));

        app.route('/allproducts/products/:productId').get((req, res) => {
            res.render(selectedProductPage, { title: "Product detail"})
        })

        app.route('/cart').post(async (req, res) => {
            let response = await this.ProductController.addToCart(req.body)

            res.send(response)
        })

        app.route('/cart/json').get(async (req, res) => {
            let response = await this.ProductController.getCartItems()
            
            res.send(response)
        })

        app.route('/cart').get(async (req, res) => {
            res.render(cartPage, { title: "Cart" })
        })


        app.route('/cart').delete(async (req, res) => {
            const removedItems = req.body.name
            
            let response = await this.ProductController.removeItemsFromCart(removedItems)
        });
    }


}

export default ProductRoutes