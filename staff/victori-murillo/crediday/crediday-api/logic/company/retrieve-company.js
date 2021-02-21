const { Company } = require('crediday-models')
const { validate } = require('crediday-utils')

 /**
 * @function Function to get company
 * @param  {string} _id company's unique id
 * @param  {object} query with company's properties to select the fields
 * @throws {Error} if the company not found 
 * @return {Promise<object>} a company
 */

module.exports = (_id, query = {}) => {
  validate.string(_id, 'id');

  return (async () => {
    const fields = Object.keys(Company.schema.obj)
    const filter = Object.keys(query).filter(key => fields.some(field => field === key))

    const companyFound = await Company.findOne({ _id }).select(filter).lean()

    if (!companyFound) throw new Error('Company Not Found')

    companyFound.id = companyFound._id.toString()
    delete companyFound._id

    return companyFound
  })()
}