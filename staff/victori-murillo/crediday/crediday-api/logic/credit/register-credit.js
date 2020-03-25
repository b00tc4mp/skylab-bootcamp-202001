const { Credit, Company, User } = require('crediday-models')
const validate = require('crediday-utils')

module.exports = (userId, body) => {

  validate.string(userId, 'userId')

  // the right way, is destructuring and check every single key in the obj
  validate.type(body, 'body', Object)

  return (async () => {
    const user = await User.findOne({_id: userId})
    if (!user) throw new Error('User doesnt exist')
    
    const companyFound = await Company.findOne({ _id: user.company })
    if (!companyFound) throw new Error('Company doesnt exist')
    //TO DO -> ONLY ALLOW REGISTER BY THE SAME COMPANY
    // TO DO --> validate with destructuring and every single key

    const { id } = await Credit.create({ user: userId, ...body, company: companyFound._id })
    return id
  })()

}