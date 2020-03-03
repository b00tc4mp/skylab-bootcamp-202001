const {validate} = require('../utils')

module.exports= (data, id) => {
    // for(const key in data) {
    //     validate.string(data[key], `${key}`)
    //     if (key === email) validate.email(data[key])


    // }

        const users = database.collection('users')
        const _id = ObjectId(id)

        return users.updateOne({_id}, {$set: data})
        .then( () => {} )
}