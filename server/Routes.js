'use strict'

import UserController from './Controllers/UserController.js'
import HttpConstants from './Models/HttpConstants.js'
import ErrorConstants from './Models/ErrorConstants.js'

/**
 * Class Routes
 * Holds the routing for the app
 * Apply Routing is the maid method that applies the controller to the route called in the express app
 */
class Routes {
    /**
     * When a 'new' instance of Routes is made, instantiate a new user controller
     */
    constructor() {
        this.UserController = new UserController();
    }

    applyRouting(app) {
        /**
         * When the a POST message is sent to the /login endpoint, call the User Controller to validate the login
         * The pattern here is: 
         * Routes <--> Controller <--> Manager <--> Repository
         * The controller controls which manager does what action
         * The manager manages the data of each component
         * The repository executes db queries and manages db connections
         */
        app.route('/login').get((req, res) => {
            res.render('../views/login.ejs')
        });

        app.route('/register').get((req, res) => {
            res.render('../views/register.ejs')
        })

        app.route('/login').post((async (req, res, next) => {

            const LoginPage = '../views/login.ejs';
            let response = await this.UserController.validateLogin(req)
        
            if (response.httpStatus == HttpConstants.HTTP_STATUS.BAD_REQUEST) {

                res.status(HttpConstants.HTTP_STATUS.BAD_REQUEST).render(LoginPage, {
                    message: ErrorConstants.ERROR_TYPE.NOT_ENTERED
                })

            } else if (response.httpStatus == HttpConstants.HTTP_STATUS.UNAUTHORIZED) {

                res.status(HttpConstants.HTTP_STATUS.UNAUTHORIZED).render(LoginPage, {
                    message: ErrorConstants.ERROR_TYPE.NOT_EXIST
                })

            } else if (response.httpStatus == HttpConstants.HTTP_STATUS.OK) {
                
                //response object is a UserModel
                res.cookie('jwt', response.response.token, this.getCookieOptions())
                res.status(HttpConstants.HTTP_STATUS.OK).redirect('/')

            } else {
                //treat as bad request
                res.status(HttpConstants.HTTP_STATUS.BAD_REQUEST).render(LoginPage)
            }
        }))

        app.route('/register').post((async (req, res, next) => {

            const registerPage = '../views/register.ejs'
            let response = await this.UserController.validateRegister(req);
            
            if(response.errorType === ErrorConstants.ERROR_TYPE.NOT_ENTERED) {

                res.render(registerPage, {
                    message: ErrorConstants.ERROR_TYPE.NOT_ENTERED
                })

            } else if (response.errorType === ErrorConstants.ERROR_TYPE.NOT_MATCH_PASSWORD) {

                res.render(registerPage, {
                    message: ErrorConstants.ERROR_TYPE.NOT_MATCH_PASSWORD
                }) 

            } else if(response.errorType === ErrorConstants.ERROR_TYPE.SHORT_PASSWORD) {

                res.render(registerPage, {
                    message: ErrorConstants.ERROR_TYPE.SHORT_PASSWORD
                }) 

            } else if (response.errorType === ErrorConstants.ERROR_TYPE.ALREADY_REGISTERED) {
                
                res.render(registerPage, {
                    message: ErrorConstants.ERROR_TYPE.ALREADY_REGISTERED
                })

            } else {
                res.redirect('/login')
            }
        }))
    }


    /**
     * Private method to get the cookie options for jwt
     */
    getCookieOptions() {
        let options = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60),
            httpOnly: true
        }
        return options
    }
}

export default Routes