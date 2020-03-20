const { Credit } = require('crediday-models')
const validate = require('crediday-utils')

module.exports = creditId => {
  validate.string(creditId, 'creditId');


  (async () => {

    let credit = await Credit.findOne({ _id: creditId }).lean()

    if (!credit) throw new Error('Credit not Found')

    credit.id = credit_id.toString()
    delete credit._id

    return credit
  })()
}