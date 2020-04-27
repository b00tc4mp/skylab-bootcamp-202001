const { models: { User, Park, Feature, Location } } = require('sick-parks-data')
const { validate } = require('sick-parks-utils')
const { NotAllowedError, NotFoundError } = require('sick-parks-errors')

/**
 * Creates a new Park on parks collection, adding it to the user parks property
 * 
 * @param {string} userId user's unique id
 * @param {object} req.body the request body with the park info
 * @param {object} req.body.park the park itself
 * @param {string} req.body.park.name the name of the park
 * @param {string} req.body.park.size the size of the park
 * @param {string} req.body.park.resort the resort the park belongs to
 * @param {string} req.body.park.level the level recomended for riding the park
 * 
 * 
 * @param {Object[]} req.body.features the features of the park
 * @param {string} req.body.features[].description the level recomended for riding the feature
 * @param {string} req.body.features[].size the size of the feature
 * 
 * @returns {string} park id 
 * 
 * @throws {ContentError} if params don't follow the format and content rules
 * @throws {TypeError} if user data and park data do not have the correct type
 * @throws {NotFoundError} when the provided user id does not match any user
 * @throws {NotAllowedError} when the park name already exists
 */


module.exports = (userId, { park, features }) => {
    validate.string(userId, 'user id')
    validate.type(park, 'park', Object)
    validate.type(features, 'features', Array)

    for (let key in park)
        if (key !== 'location') {
            validate.string(park[key], `${park[key]}`)
            park[key] = park[key].toLowerCase()
        }

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user ${userId} does not exist`)

        const _park = await Park.findOne({ name: park.name })
        if (_park) throw new NotAllowedError(`park '${_park.name}' already exists`)

        park.location = new Location({ coordinates: park.location.coordinates })


        const newPark = await Park.create(park)
        const newFeatures = features.map(feature => {
            if (feature.location) feature.location = new Location({ coordinates: feature.location.coordinates })

            return new Feature(feature)
        })

        newPark.features.push(...newFeatures)
        newPark.creator = user

        user.parks.push(newPark)

        await newPark.save()
        await user.save()

        return newPark._id.toString()

    })()


}