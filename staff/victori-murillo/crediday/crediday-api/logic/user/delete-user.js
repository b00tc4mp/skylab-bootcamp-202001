const { User } = require('crediday-models')
const validate = require('crediday-utils')

module.exports = async (_id, companyId) => {
  validate.string(_id, 'id')
  validate.string(companyId, 'companyId')

  const user = await User.findOne({ _id }).lean()
  if (!user) throw new Error(`User does not exist to delete it`)
  if (user.company.toString() !== companyId) throw new Error(`You can't remove an user from other company`)

  await User.deleteOne({ _id })
}