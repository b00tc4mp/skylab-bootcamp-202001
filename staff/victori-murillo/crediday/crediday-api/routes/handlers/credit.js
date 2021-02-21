const { registerCredit, retrieveCredit, retrieveCreditsByUser, 
  retrieveCreditsByCompany } = require('../../logic')
const { asyncHandler } = require('../../middleware')

module.exports = {
  register: asyncHandler(async ({ params, body }, res, next) => {
    await registerCredit(params.id, body)
    res.status(200).json({ message: 'Credit registered successfully' })
  }),

  retrieve: asyncHandler(async ({ params, query }, res, next) => {
    res.status(200).json({ credit: await retrieveCredit(params.creditId, query) })
  }),

  retrieveByUser: asyncHandler(async ({ params }, res, next) => {
    res.status(200).json({ credits: await retrieveCreditsByUser(params.userId) })
  }),

  retrieveByCompany: asyncHandler(async ({ payload }, res, next) => {
    res.status(200).json({ credits: await retrieveCreditsByCompany(payload.sub) })
  })
}