const { User, Comp } = require('../../models')
const validate = require('../../utils/validate')
const { compare } = require('bcryptjs')

module.exports = async ({ username, password }) => {
  validate.string(username, 'username')
  validate.string(password, 'password')

  const user = await User.findOne({ username: username.toLowerCase() })

  if (!user) throw new Error('Wrong Credentials')

  const validPassword = await compare(password, user.password)
  
  if (!validPassword) throw new Error('Wrong Credentials')

  user.authenticatedDates.push(new Date)

  const { id, company } = await user.save()

  return {
    sub: id,
    com: company
  }
}