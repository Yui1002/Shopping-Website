'use strict'

/**
 * User Response class
 * This class wraps the user response into an http status and response object
 */
class UserResponse {
    constructor(httpStatus, responseObj, errorType) {
        this._httpStatus = httpStatus
        this._response = responseObj
        this._errorType = errorType
    }

    get httpStatus() {
        return this._httpStatus
    }

    get response() {
        return this._response
    }

    get errorType() {
        return this._errorType
    }

    /**
     * @param {object} newResponse
     */
    set response(newResponse) {
        this._response = newResponse
    }

    /**
     * @param {any} status
     */
    set status(status) {
        this._httpStatus = status
    }

    set errorType(errorType) {
        this._errorType = errorType
    }
}

export default UserResponse