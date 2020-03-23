const { models: { User, Park, Feature, Location } } = require('sick-parks-data')
const { validate } = require('sick-parks-utils')
const { NotAllowedError, NotFoundError } = require('sick-parks-errors')

module.exports = (userId, { park, features }) => {
    for (let key in park)
        if (key !== 'location') {

            validate.string(park[key], `${park[key]}`)
            park[key] = park[key].toLowerCase()

        }

    //TODO Find way to make this validation right
    // features.forEach(feature => {
    //     
    //     for (key in feature) {
    //         
    //         if (key !== 'location') validate.string(feature[key], `${feature[key]}`)
    //     }
    // })

    debugger
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
        // if (park.location.geometry) {
        //     newPark.location = park.location.geometry

        // }
        user.parks.push(newPark)

        await newPark.save()
        await user.save()

        return newPark._id.toString()

    })()


}