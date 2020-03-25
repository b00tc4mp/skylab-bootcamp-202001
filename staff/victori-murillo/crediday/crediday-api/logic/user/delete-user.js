const { User } = require('crediday-models')
const validate = require('crediday-utils')

module.exports = _id => {
  validate.string(_id, 'id')

  return (async () => {
    const user = await User.findOne({ _id }).lean()
    if (!user) throw new Error(`User does not exist to delete it`)

    await User.deleteOne({ _id })
  
    return
  })()
}