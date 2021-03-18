'use strict'

import UserRepository from '../Repositories/UserRepository.js'
import md5 from 'md5'

/**
 * UserManager class
 * This class 'manages' the user
 */
class UserManager {
    constructor() {
        this.Repository = new UserRepository()
    }

    /**
     * Return true if user has valid credentials, false otherwise
     * @param {UserModel} myUser validate if a email/password combination is valid
     * @returns boolean
     */
    async validateLogin(myUser) {
        let hashedPassword = md5(myUser.password)
        let count = await this.Repository.getUserPasswordMatchCount(myUser.email, hashedPassword)

        // true/falseを返すために必要
        return count == 1 
    }

    /**
     * Get the user id
     * @param {UserModel} myUser fetch the userId of user based on email
     * @returns {UserModel}
     */
    async getUser(myUser) {
        if (!myUser.email || myUser.email.length == 0) {
            return myUser
        }
        myUser.userId = await this.Repository.getUserId(myUser.email)
        return myUser
    }
}

export default UserManager