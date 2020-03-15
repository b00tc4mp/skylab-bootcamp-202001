const { Company } = require('crediday-models')
const validate = require('crediday-utils')

module.exports = async (_id) => {
  validate.string(_id, 'id')

  const company = await Company.findOne({ _id })

  if (!company) throw new Error('Company Not Found')

  company.emailConfirmation = true
  await company.save()

  return 'Company successfully confirmed by email'
}