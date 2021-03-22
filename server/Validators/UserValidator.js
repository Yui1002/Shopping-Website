'use strict'

import LoginConstants from '../Models/LoginConstants.js'
import ErrorConstants from '../Models/ErrorConstants.js'

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
        if(!req.email || !req.password) {
            return false
        }

        return true
    }

    isValidRegisterRequest(req) {

        if(!req.name || !req.email || !req.password || !req.passwordConfirm) {
            let error = ErrorConstants.ERROR_TYPE.NOT_ENTERED
            return error
        }

        if(req.password !== req.passwordConfirm) {
            let error = ErrorConstants.ERROR_TYPE.NOT_MATCH_PASSWORD
            return error
        }

        if(req.password.length < 6) {
            let error = ErrorConstants.ERROR_TYPE.SHORT_PASSWORD
            return error
        }

        return true
    }

}

export default UserValidator;