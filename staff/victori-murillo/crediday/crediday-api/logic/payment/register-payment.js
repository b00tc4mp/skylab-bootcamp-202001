const { Payment, User } = require('crediday-models')
const validate = require('crediday-utils')

module.exports = async (creditId, body) => {
  validate.string(creditId, 'creditId')
  validate.type(body, 'body', Object);

  return (async () => {
    const { id } = await Payment.create({ credit: creditId, ...body })
    return id
  })()

}