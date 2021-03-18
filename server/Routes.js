'use strict'

import UserController from './Controllers/UserController.js'
import HttpConstants from './Models/HttpConstants.js'

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

        app.route('/login').post((async (req, res, next) => {
            // console.log(req);
            let response = await this.UserController.validateLogin(req)
            // console.log(response);
            if (response.httpStatus == HttpConstants.HTTP_STATUS.BAD_REQUEST) {

                res.status(HttpConstants.HTTP_STATUS.BAD_REQUEST)

            } else if (response.httpStatus == HttpConstants.HTTP_STATUS.UNAUTHORIZED) {

                res.status(HttpConstants.HTTP_STATUS.UNAUTHORIZED).render('../views/login.ejs')

            } else if (response.httpStatus == HttpConstants.HTTP_STATUS.OK) {
                
                //response object is a UserModel
                res.cookie('jwt', response.response.token, this.getCookieOptions())
                res.status(HttpConstants.HTTP_STATUS.OK).redirect('/')

            } else {
                //treat as bad request
                res.status(HttpConstants.HTTP_STATUS.BAD_REQUEST)
            }
        }))

        app.route('/register').post(async (req, res, next) => {
            let response = await this.UserController.validateRegister(req)
        })
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