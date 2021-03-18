'use strict'

import UserManager from '../Managers/UserManager.js';
import UserValidator from '../Validators/UserValidator.js'
import LoginConstants from '../Models/LoginConstants.js'
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

        let response = new UserResponse(HttpConstants.HTTP_STATUS.BAD_REQUEST, null);

        // 項目が未入力、もしくは認証で引っかかる
        if (!req.body || !this.Validator.isValidRequest(LoginConstants.LOGIN_TYPE.VALIDATE, req.body)) {
            return response
        }

        let myUser = new UserModel(req.body.email, req.body.password)

        //returns true/false => 重複していればtrue、していなければfalse
        let result = await this.Manager.validateLogin(myUser)

        if (!result) {
            response.status = HttpConstants.HTTP_STATUS.UNAUTHORIZED
            return response
        }

        let loggedInUser = await this.Manager.getUser(myUser)
        response.status = HttpConstants.HTTP_STATUS.OK
        response.response = loggedInUser
        console.log(loggedInUser);
        return response
    }

    async validateRegister(req) {
        let response = new UserResponse(HttpConstants.HTTP_STATUS.BAD_REQUEST, null)

        if(!req.body || !this.Validator.isValidRequest(LoginConstants.LOGIN_TYPE.SIGNUP, req.body)) {
            return response
        }
    }

}

export default UserController;