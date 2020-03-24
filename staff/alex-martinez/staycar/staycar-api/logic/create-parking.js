const { validate } = require('staycar-utils')
const { models: { User, Parking } } = require('staycar-data')
const { NotFoundError, NotAllowedError } = require('staycar-errors')

module.exports = (id, parkingName, price, totalLots) => {
    validate.string(id, 'id')
    validate.string(parkingName, 'parkingName')
    validate.type(price, "price", Number)
    validate.type(totalLots, "totalLots", Number)

    return (async () => {
        const parking = await Parking.findOne({parkingName})
        if(parking) throw new NotAllowedError(`parking with name ${parkingName} already exists`)
        const user = await User.find({id})
        if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

        let lots = []

        for (let i = 1; i <= totalLots; i++) {
            let lot = {}
            lot.number = i
            lot.status = false
      
            lots.push(lot)
          }
    
        return await Parking.create({ parkingName, rate: price, totalLots, lots })
        
    })()
}