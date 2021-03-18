// 'use strict';

// import mysql from 'mysql2'
// import dotenv from 'dotenv'
// dotenv.config();

// let instance = '';

// const con = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DATABASE,
//     port: process.env.DB_PORT
// });

// con.connect((err) => {
//     if(err) console.log(err.message);
//     else console.log('Database is connected!');
// });

// class DbService {
//     static getDbServiceInstance() {
//         return instance ? instance : new DbService();
//     }

//     async getAllData() {
//         try {
//             const res = await new Promise(function(resolve, reject) {
//                 const query = "SELECT * FROM allProducts;";
//                 con.query(query, (err, result) => {
//                     if(err) reject(new Error(err.message));
//                     resolve(result);
//                 })
//             });
//             return res;
//         } catch(err) {
//             console.log(err);
//         }
//     }

//     async getCurrentData(id) {
//         try { 
//             const res = await new Promise(function(resolve, reject) {
//                 const query = "SELECT * FROM allProducts WHERE id = ?;";
//                 con.query(query, [id], (err, result) => {
//                     if(err) reject(new Error(err.message));
//                     resolve(result);
//                 })
//             });
//             return res;
//         } catch(err) {
//             console.log(err);
//         }
//     }

//     async getPaymentData(id) {
//         try { 
//             const res = await new Promise(function(resolve, reject) {
//                 const query = "SELECT * FROM allProducts WHERE id = ?;";
//                 con.query(query, [id], (err, result) => {
//                     if(err) reject(new Error(err.message));
//                     resolve(result);
//                 })
//             });
//             return res;
//         } catch(err) {
//             console.log(err);
//         }
//     }

//     async getAddCartData() {
//         try {
//             const res = await new Promise(function(resolve, reject) {
//                 const query = "SELECT * FROM addToCart";
//                 con.query(query, (err, result) => {
//                     if(err) reject(new Error(err.message));
//                     resolve(result);
//                 })
//             })
//             return res;
//         } catch(err) {
//             console.log(err);
//         }
//     }

// }

// export default DbService
