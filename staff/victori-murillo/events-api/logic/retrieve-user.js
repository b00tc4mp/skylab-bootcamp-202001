const {validate} = require('../utils')
const { NotFoundError, NotAllowedError } = require('../errors')
const { database, database: {ObjectId}} = require('../data')

module.exports = id => {
  validate.string(id, 'id')

  const users = database.collection('users')
  const _id = ObjectId(id)

  return users.findOne({_id})
  .then(user => {

    if (!user) throw new NotFoundError(`user with id ${id} does not exist`)
    if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

    return users.updateOne({_id}, {$set:{ retrieved: new Date }})
    .then(() => {
      const {name, surname, email} = user
      return {name, surname, email}
    })
  })
}