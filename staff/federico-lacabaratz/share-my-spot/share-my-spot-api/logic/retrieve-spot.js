const { models: { Spot } } = require('share-my-spot-data')
const { validate } = require('share-my-spot-utils')
const { NotFoundError } = require('share-my-spot-errors')

module.exports = spotId => {
    validate.string(spotId, 'spotId')
    if (!spotId) throw new NotFoundError(`${spotId} is not a valid id`)

    return (async () => {
        
        const spot = await Spot.findById(spotId).populate("publisherId", "name surname email phone").lean()  

        if (!spot) throw new NotFoundError(`spot with id ${spotId} doesn't exists`)

        return spot

    })()
}