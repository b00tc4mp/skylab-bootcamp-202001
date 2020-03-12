const { registerCompany, retrieveCompany, retrieveAllCompanies } = require('../../logic')
const { asyncHandler } = require("../../middleware")

module.exports = {
  register: asyncHandler(async (req, res, next) => {
    await registerCompany(req.body)
    res.json({ message: 'Company and User registered successfully' })
  }),

  retrieve: asyncHandler(async ({ params, query }, res, next) => {
    const company = await retrieveCompany(params.id, query)
    res.json({ company })
  }),

  retrieveAll: asyncHandler(async (req, res, next) => {
    const companies = await retrieveAllCompanies(req.query)
    res.json({ companies })
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