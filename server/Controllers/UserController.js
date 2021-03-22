'use strict'

import UserManager from '../Managers/UserManager.js';
import UserValidator from '../Validators/UserValidator.js'
import LoginConstants from '../Models/LoginConstants.js'
import ErrorConstants from '../Models/ErrorConstants.js'
import UserModel from '../Models/UserModel.js'
import HttpConstants from '../Models/HttpConstants.js'
import UserResponse from '../Models/UserResponse.js'

class UserController {
    constructor() {
        this.Manager = new UserManager();
        this.Validator = new UserValidator();
    }

    /**
     * Validate that the user email/password combo is valid
     * @param {string} email 
     * @param {string} password
     * @returns {boolean} true if valid, false otherwise 
     */
    async validateLogin(req) {

        let response = new UserResponse(HttpConstants.HTTP_STATUS.BAD_REQUEST, null, ErrorConstants.ERROR_TYPE.NOT_ENTERED);

        // // 項目が未入力、もしくは認証で引っかかる
        if (!this.Validator.isValidRequest(LoginConstants.LOGIN_TYPE.VALIDATE, req.body)) {
            return response
        }

        let myUser = new UserModel(null, req.body.email, req.body.password)

        // return true/false
        let result = await this.Manager.validateLogin(myUser)
  
        if (!result) {
            response.status = HttpConstants.HTTP_STATUS.UNAUTHORIZED
            response.errorType = ErrorConstants.ERROR_TYPE.NOT_EXIST
            return response
        } 

        let loggedInUser = await this.Manager.getUser(myUser)
        response.status = HttpConstants.HTTP_STATUS.OK
        response.response = loggedInUser
        response.errorType = null
        return response
    }

    async validateRegister(req) {
  
        // Define response based on error type
        let response = new UserResponse(HttpConstants.HTTP_STATUS.BAD_REQUEST, null, null)
        let response1 = new UserResponse(HttpConstants.HTTP_STATUS.BAD_REQUEST, null, ErrorConstants.ERROR_TYPE.NOT_ENTERED)
        let response2 = new UserResponse(HttpConstants.HTTP_STATUS.BAD_REQUEST, null, ErrorConstants.ERROR_TYPE.NOT_MATCH_PASSWORD)
        let response3 = new UserResponse(HttpConstants.HTTP_STATUS.BAD_REQUEST, null, ErrorConstants.ERROR_TYPE.SHORT_PASSWORD)
        let response4 = new UserResponse(HttpConstants.HTTP_STATUS.OK, null, ErrorConstants.ERROR_TYPE.ALREADY_REGISTERED)
        
        if(this.Validator.isValidRequest(LoginConstants.LOGIN_TYPE.SIGNUP, req.body) === ErrorConstants.ERROR_TYPE.NOT_ENTERED) {
            response1.errorType = ErrorConstants.ERROR_TYPE.NOT_ENTERED
            return response1
        }

        if(this.Validator.isValidRequest(LoginConstants.LOGIN_TYPE.SIGNUP, req.body) === ErrorConstants.ERROR_TYPE.NOT_MATCH_PASSWORD) {
            response2.errorType = ErrorConstants.ERROR_TYPE.NOT_MATCH_PASSWORD
            return response2
        }

        if(this.Validator.isValidRequest(LoginConstants.LOGIN_TYPE.SIGNUP, req.body) === ErrorConstants.ERROR_TYPE.SHORT_PASSWORD) {
            response3.errorType = ErrorConstants.ERROR_TYPE.SHORT_PASSWORD
            return response3
        }

        let myUser = new UserModel(req.body.name, req.body.email, req.body.password)
        
        let result = await this.Manager.validateRegister(myUser)
        
        if(result) {
            response4.status = HttpConstants.HTTP_STATUS.UNAUTHORIZED
            response4.errorType = ErrorConstants.ERROR_TYPE.ALREADY_REGISTERED
            return response4
        }

        let registeredUser = await this.Manager.registerNewUser(myUser)
        response.status = HttpConstants.HTTP_STATUS.OK
        response.response = registeredUser

        return response
    }
}

export default UserController;