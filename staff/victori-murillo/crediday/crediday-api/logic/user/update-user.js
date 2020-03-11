const { User } = require('crediday-models')
const { validate } = require('crediday-utils')

module.exports = async (id, body) => {
  // validate.string(id, 'id')

  if (!body) throw new Error('Please add something to update')

  const userFound = await User.findOne({ id }).lean()
  if (!userFound) throw new Error('Not Found')

  console.log(userFound)



  return userFound
}