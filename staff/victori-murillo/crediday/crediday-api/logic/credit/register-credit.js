const { Credit, Company, User } = require('crediday-models')
const { validate } = require('crediday-utils')

 /**
 * @function Function to register company
 * @param  {string} _id user's unique id
 * @param  {object} body with credit's properties
 * @throws {Error} if the (user || company) not exits 
 * @return {Promise<string>} an credit id
 */

module.exports = (userId, body) => {

  validate.string(userId, 'userId')

  // the right way, is destructuring and check every single key in the obj
  validate.type(body, 'body', Object)

  return (async () => {
    const user = await User.findOne({ _id: userId })
    if (!user) throw new Error('User doesnt exist')


    const companyFound = await Company.findOne({ _id: user.company })
    if (!companyFound) throw new Error('Company doesnt exist')
    //TO DO -> ONLY ALLOW REGISTER BY THE SAME COMPANY
    // TO DO --> validate with destructuring and every single key

    const { id } = await Credit.create({ user: userId, ...body, company: companyFound._id })
    user.credits.push(id)
    await user.save()
    
    return id
  })()

}