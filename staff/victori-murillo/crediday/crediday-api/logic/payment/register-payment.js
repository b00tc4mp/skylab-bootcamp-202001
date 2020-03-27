const { Payment, Credit } = require('crediday-models')
const { validate } = require('crediday-utils')

module.exports = async ({ creditId, body }) => {
  validate.string(creditId, 'creditId')
  validate.type(body, 'body', Object)

  return (async () => {
    const credit = await Credit.findOne({ _id: creditId })
    if (!credit) throw new Error("Credit doesn't exist")
    const { id } = await Payment.create({ credit: creditId, ...body, company: credit.company })
    return id
  })()

}