const { Credit } = require('crediday-models')
const validate = require('crediday-utils')

module.exports = userId => {
  console.log(userId)
  validate.string(userId, 'userId')

  return (async () => {

    let credits = await Credit.find({ user: userId }).lean()
    console.log(credits)

    if (!credits.length) throw new Error('Credits not Found')

    credits.forEach(credit => {
      credit.id = credit._id.toString()
      delete credit._id
    })

    return credits
  })()
}