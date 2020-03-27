const { validate } = require('badabici-utils')
const { models: { User } } = require('badabici-data')
const { NotAllowedError } = require('badabici-errors')
const bcrypt = require('bcryptjs')

/**
 * Checks user credentials against the storage
 * 
 * @param {string} email user's unique e-mail
 * @param {string} password user's password
 * 
 * @returns {Promise<string>} user id from storage
 * 
 * @throws {ContentError} if user data does not follow the format and content rules
 * @throws {TypeError} if user data does not have the correct type
 * @throws {NotAllowedError} on wrong credentials
 */
module.exports = (id, body) => {
  

    validate.type(body, 'body', Object)

    const newfields = {}

    for (const key in body) {
        newfields[key] = body[key]
    }

        
    return User.findById(id)
        .then(user => {
            if (!user) throw new NotAllowedError(`the user does not exists`)

            else {

                if (newfields.newpassword) {
                    
                    return bcrypt.compare(newfields.password, user.password)
                        .then(async (validPassword) => {
                            if (!validPassword) throw new NotAllowedError(`wrong credentials`)
                            
                            delete newfields.password
                            const newpass = await bcrypt.hash(newfields.newpassword, 10)
    
    
    
                            return User.findByIdAndUpdate(id, { password: newpass })
                        })
                        .then(() => {
                            
                            return User.findByIdAndUpdate(id, { $set: newfields })
                                .then(() => { })
                                .catch((error) => {
                                    throw new NotFoundError(error.message)
                                    
                                })
                        })
                } else {
                    return User.findByIdAndUpdate(id, { $set: newfields })
                        .then(() => { })
                        .catch((error) => {
                            throw new NotFoundError(error.message)
                            
                        })
                }
            }
        })
    
}