const { registerCompany } = require('../../logic')

module.exports = {
  register: async (req, res, next) => {
    await registerCompany(req.body)
    res.status(200).json({message: 'Company registered successfully'})
  }
}