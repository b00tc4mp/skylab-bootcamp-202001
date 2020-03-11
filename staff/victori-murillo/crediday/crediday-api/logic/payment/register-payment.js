const { Credit } = require('crediday-models')
const { validate } = require('crediday-utils')

module.exports = async (credit) => {

  // validate.string(firstName, 'firstName')
  // validate.length(firstName, 3, 30)

  await Credit.create(credit)
}