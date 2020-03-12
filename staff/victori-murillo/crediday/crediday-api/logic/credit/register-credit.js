const { Credit, Company } = require('crediday-models')
const validate = require('crediday-utils')

module.exports = async (id, body) => {
  const { company } = body
  console.log(company)

  validate.string(id, 'id')
  validate.type(body, 'body', Object)


  const companyFound = await Company.findOne({ _id: company })
  if (!companyFound) throw new Error('Company doesnt exist')
  //TO DO -> ONLY ALLOW REGISTER BY THE SAME COMPANY
  // TO DO --> validate with destructuring and every single key

  await Credit.create({ user: id, ...body })
}