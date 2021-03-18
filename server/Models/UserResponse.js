'use strict'

/**
 * User Response class
 * This class wraps the user response into an http status and response object
 */
class UserResponse {
    constructor(httpStatus, responseObj) {
        this._httpStatus = httpStatus
        this._response = responseObj
    }

    get httpStatus() {
        return this._httpStatus
    }

    get response() {
        return this._response
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
}

export default UserResponse