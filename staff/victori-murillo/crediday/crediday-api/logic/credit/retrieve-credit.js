const { Credit } = require('crediday-models')
const { validate } = require('crediday-utils')

/**
 * @function Function to get a specific credit
 * @param  {string} creditId credit's unique id
 * @throws {Error} if the credit not found 
 * @return {Promise<string>} an credit id
 */

module.exports = creditId => {
  validate.string(creditId, 'creditId');

  return (async () => {

    let credit = await Credit.findOne({ _id: creditId }).lean()

    if (!credit) throw new Error('Credit not Found')

    credit.id = credit._id.toString()
    delete credit._id

    return credit
  })()
}