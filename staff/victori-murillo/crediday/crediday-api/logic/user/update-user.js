const { User } = require('crediday-models')
const { validate } = require('crediday-utils')

module.exports = (_id, body) => {
  validate.string(_id, 'id')
  validate.type(body, 'body', Object)

  if (!body) throw new Error('Please add something to update')

  const allowedKeys = Object.keys(User.schema.obj)

  for (const property in body) {
    if (!allowedKeys.some(key => key === property)) {
      throw new Error(`User has not '${property}' as property`)
    }
  }

  const forbiddenKeys = ['registrationDate', 'credits', 'authenticatedDates', 'company']

  forbiddenKeys.forEach(_key => {
    for (const key in body) {
      if (key === _key) throw new Error(`The property '${key}' is forbidden to modify it`)

      if (key === 'configInitialAmount') {
        validate.type(body[key], key, Boolean)

      } else if (key === 'role' && body[key] === 'developer') {
        throw new Error(`You have forbidden modified the 'role' to ${body[key]}`)

      } else {
        validate.string(body[key], key)
        body[key] = body[key].trim()
      }
    }
  })

  return (async () => {
    user = await User.findOne({ _id })

    for (const key in body) {
      user[key] = body[key]
    }
    
    return await user.save()
  })()

}