const { Company } = require('crediday-models')
const { validate } = require('crediday-utils')

/**
 * @function Function to confirm company through email
 * @param {string} companyId company's unique id
 * @throws {Error} if the company not exists
 * @return {Promise<undefined>} undefined
 */

module.exports = companyId => {
  validate.string(companyId, 'companyId')

  return (async () => {
    const company = await Company.findOne({ _id: companyId })
    if (!company) throw new Error('Company Not Found')

    company.emailConfirmation = true
    await company.save()
  })()
}