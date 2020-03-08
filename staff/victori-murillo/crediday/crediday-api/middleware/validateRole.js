const { User } = require('../models')

module.exports = async (req, res, next) => {
  try {
    const { payload: { sub: id } } = req

    const user = await User.findOne({ id, role: 'developer' })

    if (!user) throw new Error('You dont have permission')
    next()
    
  } catch (error) {
    next(error)
  }

}