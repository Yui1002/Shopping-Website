'use strict'

import LoginConstants from '../Models/LoginConstants.js'

class UserValidator {
    constructor() {

    }

    isValidRequest(requestType, req) {
        if (requestType == LoginConstants.LOGIN_TYPE.VALIDATE) {
            return this.isValidLoginRequest(req)
        }

        if(requestType == LoginConstants.LOGIN_TYPE.SIGNUP) {
            return this.isValidRegisterRequest(req)
        }
    }

    isValidLoginRequest(req) {
        if (!req) {
            return false
        }

        if (!req.email || req.email.length == 0) {
            return false
        }

        if (!req.password || req.password.length == 0) {
            return false
        }

        return true
    }

    isValidRegisterRequest(req) {
        if(!req) {
            return false
        }
        z
    }
}

export default UserValidator;