const { models: { User, Parking } } = require('staycar-data')

module.exports = (id) => {
    validate.string(id, 'id')

    return (async () => {
        const user = await User.find(id)
        if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

        const parking = await Parking.create()
        
        return parking.id
    })
}