'use strict';

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import md5 from 'md5'
import mysql from 'mysql2/promise'
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser'
import Routes from './Routes.js'
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const routes = new Routes();

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const publicDirectory = path.join(__dirname, '../public');
app.use(express.static(publicDirectory));


app.set('view engine', 'ejs');
app.set('views', 'views');

const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

// ルーティング
// app.get('/getAll', (req, res) => {
//     const db = dbService.getDbServiceInstance();
//     const result = db.getAllData();
    
//     result
//     .then(data => res.json({Product: data}))
//     .catch(err => console.log(err));
// });

// app.get('/getCurrent/:id', (req, res) => {
//     const id = req.params.id;
//     const db = dbService.getDbServiceInstance();
//     const result = db.getCurrentData(id);

//     result
//     .then(data => res.json({Product: data}))
//     .catch(err => console.log(err));
// });

// app.get('/getPayment/:id', (req, res) => {
//     const id = req.params.id;

//     const db = dbService.getDbServiceInstance();
//     const result = db.getPaymentData(id);

//     result
//     .then(data => res.json({Product: data}))
//     .catch(err => console.log(err));
// })

// app.post('/addToCart', (req, res) => {
//     try {
//         const image = req.body.image;
//         const name = req.body.name;
//         const price = req.body.price;
//         const size = req.body.size;
//         const quantity = req.body.quantity;

//         const query = "INSERT INTO addToCart (image, name, price, size, quantity) VALUES (?,?,?,?,?);";
//         con.query(query, [image, name, price, size, quantity], (err, result) => {
//             if(err) {
//                 console.log(err);
//             } else {
//                 return res.send('success');
//             }
//         })   
//     } catch(err) {
//         console.log(err);
//     }
// });

// app.delete('/addToCart', (req, res) => {
//     const name = req.body.name;
//     const query = "DELETE FROM addToCart WHERE name = ?;";
//     con.query(query, [name], (err, result) => {
//         if(err) {
//             console.log(err);
//         } else {
//             return res.send('success')
//         }
//     })
// })

// app.get('/getAddToCart', (req, res) => {
//     const db = dbService.getDbServiceInstance();
//     const result = db.getAddCartData();
    
//     result
//     .then(data => {
//         console.log(data);
//         res.json({Product: data})
//     })
//     .catch(err => console.log(err));
// })

// // Login Router
// // app.get('/login', (req, res) => {
// //     res.render('../views/login.ejs')
// // });

// app.get('/register', (req, res) => {
//     res.render('../views/register.ejs')
// });

// /**
//  * Use a router to apply routing to the app.
//  * Routes are stored in Routes.js
//  */
routes.applyRouting(app)

// app.post('/register', (req, res) => {
//     // console.log(req.body);
//     const { name, email, password, passwordConfirm} = req.body;
//     const query = 'SELECT email FROM users WHERE email = ?';
//     con.query(query, [email], async (error, result) => {
//         if(error) {
//             console.log(error);
//         }

//         if(result.length > 0) {
//             return res.render('../views/register', {
//                 message: 'That email is already in use'
//             })
//         } else if(password !== passwordConfirm) {
//             return res.render('../views/register', {
//                 message: 'Password do not match'
//             });
//         }
//         let hashedPassword = md5(req.body.password);

//         const query = 'INSERT INTO users SET ?';
//         con.query(query, { name: name, email: email, password: hashedPassword }, (error, result) => {
//             if(error) {
//                 console.log(error);
//             } else {
//                 return res.render('../views/register', {
//                     message: 'User registered'
//                 })
//             }
//         })
//     })
// })

app.listen(process.env.PORT, () => console.log('app is running'));
