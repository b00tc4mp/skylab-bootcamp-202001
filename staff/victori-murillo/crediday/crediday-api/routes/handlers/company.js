const { registerCompany, retrieveCompany, retrieveAllCompanies, confirmCompany } = require('../../logic')
const { asyncHandler } = require("../../middleware")

module.exports = {
  register: asyncHandler(async (req, res, next) => {
    res.json({ email: await registerCompany(req.body) })
  }),

  retrieve: asyncHandler(async ({ params, query }, res, next) => {
    res.json({ company: await retrieveCompany(params.id, query) })
  }),

  retrieveAll: asyncHandler(async (req, res, next) => {
    res.json({ companies: await retrieveAllCompanies(req.query) })
  }),

  confirm: asyncHandler(async ({ params: { id } }, res, next) => {
    await confirmCompany(id)
    res.json({ message: 'Company successfully confirmed by email' })
  })

  // TODO after Bootcamp

  // update: asyncHandler(async (req, res, next) => {
  //   await update(req.body)
  //   res.status(201).json({ message: 'Company and User registered successfully' })
  // }),

  // delete: asyncHandler(async (req, res, next) => {
  //   await update(req.body)
  //   res.status(201).json({ message: 'Company and User registered successfully' })
  // }),
}