const { Company } = require('crediday-models')

module.exports = (query = {}) => {

  const fields = Object.keys(Company.schema.obj)
  const filter = Object.keys(query).filter(key => fields.some(field => field === key));

  return (async () => {

    const companies = await Company.find().select(filter).lean()

    if (!companies.length) throw new Error('Not Found')

    companies.forEach(company => {
      company.id = company._id.toString()
      delete company._id
    })

    return companies
  })()
}