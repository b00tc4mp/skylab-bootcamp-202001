const { Credit, Company } = require('crediday-models')
const validate = require('crediday-utils')

module.exports = (userId, body) => {
  const { company } = body

  validate.string(userId, 'userId')

  // the right way, is destructuring and check every single key in the obj
  validate.type(body, 'body', Object);

  return (async () => {

    const companyFound = await Company.findOne({ _id: company })
    if (!companyFound) throw new Error('Company doesnt exist')
    //TO DO -> ONLY ALLOW REGISTER BY THE SAME COMPANY
    // TO DO --> validate with destructuring and every single key

    await Credit.create({ user: userId, ...body })
  })()

}