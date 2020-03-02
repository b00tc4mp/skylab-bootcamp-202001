const {database, database:{ObjectId}} = require('../data')
const {validate} = require("../utils")

module.exports = async(id) => {

  validate.string(id, 'id')

  const users = database.collection('users')

  await users.deleteOne({_id: ObjectId(id)})
  // .then(() => {})
}