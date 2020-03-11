const { NotFoundError, NotAllowedError } = require('sick-parks-errors')
const { models: { Park, User } } = require('sick-parks-data')
const { validate } = require('sick-parks-utils')

module.exports = async (userId, { id: parkId }) => {
    validate.string(userId, 'userId')
    validate.string(parkId, 'parkId')
    //CHANGES IN PARAMS CHECK TO MODIFY TESTS
    const user = await User.findById(userId)
    if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

    const park = await Park.findById(parkId)

    if (!park) throw new NotFoundError(`park with id ${parkId} does not exist`)
    if (park.approvals.includes(user._id)) throw new NotAllowedError(`user with id ${userId} already approved`)


    park.approvals.push(user)
    user.contributions.push(park)

    if (park.approvals.length >= 5) {
        park.verified = true
        await park.save()
        return
    }
    await user.save()
    await park.save()
    return

}