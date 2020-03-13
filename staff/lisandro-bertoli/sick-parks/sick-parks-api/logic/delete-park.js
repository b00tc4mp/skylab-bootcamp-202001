const { validate } = require('sick-parks-utils')
const { NotFoundError, NotAllowedError } = require('sick-parks-errors')
const { models: { User, Park } } = require('sick-parks-data')

module.exports = (parkId, userId) => {
    validate.string(parkId, 'parkId')
    if (userId || userId === '') validate.string(userId, 'userId')
    //TODO CHECK FOR CHANGES ON PARAMTERS TO CHANGE TESTSSS!!!
    return (async () => {
        if (userId) {
            const user = await User.findById(userId)
            if (!user) throw new NotFoundError(`user ${userId} does not exist`)

            const { deletedCount } = await Park.deleteOne({ _id: parkId, creator: userId })

            if (deletedCount === 0) throw new NotAllowedError(`user ${userId} did not create this park`)

            const parks = user.parks.filter(id => id !== parkId)
            user.parks = parks

            await user.save()
            return
        }

        const park = await Park.findById(parkId)

        if (!park) throw new NotFoundError(`park ${parkId} does not exist`)
        if (!park.underReview) throw new NotAllowedError(`park ${parkId} is not under review. A user id is required`)

        const difference = park.approvals.length - park.reports.length

        if (!park.approvals.length || difference < 0) {
            await Park.deleteOne({ _id: parkId })
            await User.updateOne({ _id: park.creator }, { $pull: { parks: { $in: [parkId] } } })
            return
        }

        return


    })()
}