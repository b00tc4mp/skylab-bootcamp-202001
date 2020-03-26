const { Company } = require('crediday-models')
const { validate } = require('crediday-utils')

module.exports = companyId => {
  validate.string(companyId, 'companyId');

  return (async () => {
    const company = await Company.findOne({ _id: companyId })
    if (!company) throw new Error('Company Not Found')

    company.emailConfirmation = true
    await company.save()
  })()
}