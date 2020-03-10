const { validate } = require('sick-parks-utils')
const { models: { Park, User } } = require('sick-parks-data')
const { NotAllowedError, NotFoundError } = require('sick-parks-errors')

module.exports = (params, body) => {
    const { userId, parkId } = params
    const { problem } = body

    validate.string(userId, 'userId')
    validate.string(parkId, 'parkId')
    validate.string(problem, 'problem')

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

        const park = await Park.findById(parkId)

        if (!park) throw new NotFoundError(`park with id ${parkId} does not exist`)


        if (park.verified) throw new NotAllowedError(`park ${parkId} has already been verified`)

        park.reports.forEach(_report => {
            if (_report.user._id.toString() === userId && _report.problem === problem)
                throw new NotAllowedError(`user ${userId} alredy filed this report`)

        })

        let duplicate = 0
        let unreal = 0

        const report = {
            user: userId,
            problem
        }

        park.reports.push(report)
        user.contributions.push(parkId)

        if (report.problem === 'duplicate')++duplicate
        if (report.problem === 'unreal')++unreal


        park.reports.forEach(_report => {
            if (_report.problem === 'duplicate')++duplicate
            if (_report.problem === 'unreal')++unreal

            if (duplicate === 5 || unreal === 5) park.underReview = true

        })

        await user.save()
        await park.save()

        return park.underReview // on route check for property to call deletePark 
    })()
}