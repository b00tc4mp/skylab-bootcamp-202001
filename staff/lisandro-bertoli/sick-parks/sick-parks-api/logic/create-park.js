const { models: { User, Park, Feature } } = require('sick-parks-data')
const { validate } = require('sick-parks-utils')
const { NotAllowedError, NotFoundError } = require('sick-parks-errors')

module.exports = (userId, { park, features }) => {
    debugger
    for (key in park)
        if (key !== 'location') validate.string(park[key], `${park[key]}`)

    //TODO Find way to make this validation right
    // features.forEach(feature => {
    //     debugger
    //     for (key in feature) {
    //         debugger
    //         if (key !== 'location') validate.string(feature[key], `${feature[key]}`)
    //     }
    // })


    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user ${userId} does not exist`)

        const _park = await Park.findOne({ name: park.name })
        if (_park) throw new NotAllowedError(`park '${_park.name}' already exists`)

        const newPark = await Park.create(park)
        const newFeatures = features.map(feature => new Feature(feature))

        newPark.features.push(...newFeatures)
        newPark.creator = user
        newPark.location = park.location.geometry
        user.parks.push(newPark)

        await newPark.save()
        await user.save()

        return newPark._id.toString()

    })()


}