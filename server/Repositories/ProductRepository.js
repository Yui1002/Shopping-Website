
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

class ProductRepository {
    constructor() {
        this._connection = null
    }

    /**
     * Open a connection
     * @returns {mysqlConnection}
     */
    async getConnection() {
        if (!this._connection) {
            this._connection = await mysql.createConnection({
                host: process.env.HOST,
                user: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DATABASE,
                port: process.env.DB_PORT
            });
        }
        return this._connection;
    }

    /**
     * Close the connection to lessen db load
     */
    async endConnection() {
        if (this._connection) {
            await this._connection.end()
        }
        this._connection = null
    }

    async getAllProductsFromDB() {
        let query = "SELECT * FROM products"
        try {

            let con = await this.getConnection()

            let [rows, fields] = await con.query(query)

            await this.endConnection()
            
            return rows

        } catch(exception) {
            console.log("getAllProducts threw an exception");
            console.log(exception);
        }
    }

    async getSelectedProductFromDB(parameter) {
        let query = "SELECT * FROM products WHERE id = ?"

        try {

            let con = await this.getConnection()

            let [rows, fields] = await con.query(query, [parameter])

            await this.endConnection()

            return rows

        } catch(exception) {
            console.log(exception);
            console.log("getSelectedProductFromDB threw an exception");
        }
    }

    async addItemToCart(parameter) {
        const img = parameter.img
        const name = parameter.name
        const price = parameter.price

        let query = "INSERT INTO addToCart (image, name, price) VALUES (?,?,?);"

        try {

            let con = await this.getConnection()

            let [rows, fields] = await con.query(query, [img, name, price])

            await this.endConnection()

            return rows

        } catch(exception) {
            console.log(exception);
            console.log("addItemToCart threw an exception");
        }
    }

    async getCartItemsFromDB() {
        let query = "SELECT * FROM addToCart;"

        try {

            let con = await this.getConnection()

            let [rows, fields] = await con.query(query)

            await this.endConnection()

            return rows

        } catch(exception) {
            console.log(exception);
            console.log('getCartItemsFromDB threw an error');
        }
    }

    async removeItemsFromCart(items) {
        let query = "DELETE FROM addToCart WHERE name = ?;";

        try {
            let con = await this.getConnection()

            let [rows, fields] = await con.query(query, [items])

            await this.endConnection()

            return rows

        } catch(exception) {

        }
    }
}

export default ProductRepository