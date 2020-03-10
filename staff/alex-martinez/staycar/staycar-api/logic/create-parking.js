const { validate } = require('staycar-utils')
const { models: { User, Parking } } = require('staycar-data')

module.exports = (id, pkName) => {
    validate.string(id, 'id')
    validate.string(pkName, 'pkName')

    return (async () => {
        const user = await User.find({id})
        if (!user) throw new NotFoundError(`user with id ${id} does not exist`)
        debugger
        await Parking.create({ parkingName: pkName })
        
    })()
}