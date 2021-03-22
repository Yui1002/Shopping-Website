'use strict'

import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config();

/**
 * UserRepository class
 * This holds mysql methods specifically for the User.
 * Only add methods that affect a user in this class for organization
 */
class UserRepository {

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

    /**
     * Get the number of users that match in the same username and password
     * @param {string} email 
     * @param {string} password
     * @returns int 
     */
    async getUserPasswordMatchCount(email, password) {
        let query = "SELECT COUNT(*) AS count FROM users WHERE email = ? AND password = ?;"
        
        try {
            //open connection to db
            let con = await this.getConnection()
            
            //query for data
            let [rows, fields] = await con.query(query, [email, password])

            //close the connection to db to save resources
            await this.endConnection()
            
            //return result set
            return rows[0].count

        } catch (exception) {
            //log exception
            console.log("getUserPasswordMatchCount threw an exception")
            console.log(exception)
            return 0
        }
    }
     
    /**
     * Get the userId of user based on email
     * @param {string} email
     * @returns int 
     */
    async getUserId(email) {
        let query = "SELECT id FROM users WHERE email = ?;"

        try {
            let con = await this.getConnection()
            
            let [rows, fields] = await con.query(query, [email])

            await this.endConnection()

            return rows[0].id

        } catch (exception) {
            console.log("getUserId threw an exception")
            console.log(exception)
        }
    }

    async checkIsRegistered(email, password) {
        let query = "SELECT COUNT(*) AS count FROM users WHERE email = ? AND password = ?;"

        try {
            let con = await this.getConnection()

            let [rows, fields] = await con.query(query, [email, password])

            await this.endConnection()

            return rows[0].count

        } catch(exception) {
            console.log("checkIsRegistered threw an exception")
            console.log(exception)
        }
    }

    async registerUserToDB(name, email, password) {
        let query = "INSERT INTO users (name, email, password) VALUES (?,?,?);"

        try {
            let con = await this.getConnection()

            let [rows, fields] = await con.query(query, [name, email, password])

            await this.endConnection()

            return 

        } catch(exception) {
            console.log("registerUserToDB threw an exception")
            console.log(exception)
        }
    }
}

export default UserRepository