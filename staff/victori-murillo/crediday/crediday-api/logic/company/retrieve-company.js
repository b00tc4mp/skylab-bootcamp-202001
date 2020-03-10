const { Company } = require('crediday-models')
const { validate } = require('crediday-utils')

module.exports = async (_id, query) => {
  validate.string(_id, 'id')

  const fields = Object.keys(Company.schema.obj)
  const filter = Object.keys(query).filter(key => fields.some(field => field === key))

  const companyFound = await Company.findOne({_id}).select(filter).lean()

  if (!companyFound) throw new Error('Company Not Found')

  companyFound.id = companyFound._id.toString()
  delete companyFound._id

  return companyFound
}