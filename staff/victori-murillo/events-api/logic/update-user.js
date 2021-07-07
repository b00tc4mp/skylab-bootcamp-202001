const { validate } = require('events-utils')
const {SchemaTypes: ObjectId} = require('events-models')


module.exports = (data, id) => {
  for (const key in data) {
    if (key === 'email') validate.email(data[key])
    validate.string(data[key], key)
  }

  const users = db.collection('users')
  const _id = ObjectId(id)

  return users.updateOne({ _id}, {$set: data })
  .then(() => {})
}