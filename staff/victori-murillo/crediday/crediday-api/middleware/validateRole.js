const { User } = require('crediday-models')

module.exports = async (req, res, next) => {
  try {
    const { payload: { sub: _id } } = req

    const user = await User.findOne({ _id, role: 'owner' })

    if (!user) throw new Error("You do not have permission")
    next()
    
  } catch (error) {
    next(error)
  }

}