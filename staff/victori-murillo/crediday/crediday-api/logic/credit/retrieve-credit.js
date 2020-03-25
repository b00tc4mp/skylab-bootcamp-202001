const { Credit } = require('crediday-models')
const validate = require('crediday-utils')

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