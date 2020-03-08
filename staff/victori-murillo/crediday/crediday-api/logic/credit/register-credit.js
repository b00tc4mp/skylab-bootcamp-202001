const { Credit } = require('../../models')
const validate = require('../../utils/validate')

module.exports = async (credit) => {

  // validate.string(firstName, 'firstName')
  // validate.length(firstName, 3, 30)

  await Credit.create(credit)
}