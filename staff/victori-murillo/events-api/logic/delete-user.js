const {database, database:{ObjectId}} = require('../data')
const {validate} = require("../utils")

module.exports = (id) => {

  validate.string(id, 'id')

  const users = database.collection('users')

  return users.deleteOne({_id: ObjectId(id)})
  .then(() => {})
}