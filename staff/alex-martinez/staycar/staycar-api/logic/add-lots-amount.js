const { validate } = require('staycar-utils')
const { models: { User, Parking } } = require('staycar-data')
//const { NotAllowedError } = require('staycar-errors')

module.exports = (id, totalLots) => {
    validate.string(id, 'id')
    validate.type(totalLots, 'totalLots', Number)
    if(totalLots <= 0) throw new TypeError('the number of lots must be biger than 0')

    return User.findById(id)
    .then((user) => {
        if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

        const parking = new Parking({totalLots})
        return parking.save()
    })
    .then(() => {})
    
}