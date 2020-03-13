const { Payment } = require('crediday-models')
const validate = require('crediday-utils')

module.exports = async (creditId, body) => {

  // TO DO --> validate with destructuring and every single key

  await Payment.create({ credit: creditId, ...body })
}