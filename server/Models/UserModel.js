'use strict'
import jwt from 'jsonwebtoken'

/**
 * UserModel class
 * This class holds the user data in an object that can be passed around easily
 */
class UserModel {
    constructor(email, password) {
        this._email = email
        this._password = password
        this._isValid = false
        this._userId = -1
        this.token = ''
    }

    get email() {
        return this._email
    }

    get password() {
        return this._password
    }

    get getisValid() {
        return this.isValid
    }

    get getJwtToken() {
        return this.token
    }

    set email(newEmail) {
        this._email = newEmail
    }

    set password(newPassword) {
        this._password = newPassword
    }

    /**
     * @param {boolean} bool
     */
    set isValid(bool) {
        this._isValid = bool
    }

    /**
     * @param {number} id
     */
    set userId(id) {
        this._userId = id
        this.token = ''
        this.setJWTToken()
    }

    setJWTToken() {
        if (this.token == '') {
            this.token = jwt.sign({id: this.userId}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            })
        }
    }


}

export default UserModel