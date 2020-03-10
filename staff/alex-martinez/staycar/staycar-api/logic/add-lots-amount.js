const { validate } = require('staycar-utils')
const { models: { User, Parking } } = require('staycar-data')
//const { NotAllowedError } = require('staycar-errors')

module.exports = (id, idParking, totalLots) => {
    validate.string(id, 'id')
    validate.string(idParking, 'idParking')
    validate.type(totalLots, 'totalLots', Number)
    if(totalLots <= 0) throw new TypeError('the number of lots must be biger than 0')

    return (async ()=> {

        const user = await User.find(id)
        if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

        const parking = await Parking.find({idParking}).lean()
        if (!parking) throw new NotFoundError(`parking with id ${id} does not exist`)

        const {totalLots: totalLots_, lots} = parking

        totalLots_ += totalLots

        for (let i = 0; i < totalLots_; i++) {
            const lot = {}
            lot.number = i
            lot.status = false

            lots.push(lot)
        }

        await parking.save()

    })()
    
}