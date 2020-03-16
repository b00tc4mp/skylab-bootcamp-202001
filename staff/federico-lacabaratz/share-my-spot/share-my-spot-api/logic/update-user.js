const { validate } = require('share-my-spot-utils')
const { models: { User } } = require('share-my-spot-data')
const { ContentError, NotAllowedError } = require('share-my-spot-errors')
const bcrypt = require('bcryptjs')

module.exports = (userId, body) => {
    validate.string(userId, 'userId')

    const validFields = ['email', 'password', 'oldPassword', 'phone']

    for (key in body) {
        if (!validFields.includes(key)) throw new NotAllowedError(`field ${key} cannot be modified`)

        if (key === 'password' && !body.oldPassword) throw new ContentError('Old password is needed to change password')
    }

    return (async() =>{
        const user = await User.findById(userId)
    
        if (body.password) {
            const result = await bcrypt.compare(body.oldPassword, user.password)
    
            if (!result) throw new NotAllowedError('wrong credentials')
            body.password = await bcrypt.hash(body.password, 10)
        }
    
        for (key in body) {
            user[key] = body[key]
        }
        
        await user.save()
        return 
    })()
}
