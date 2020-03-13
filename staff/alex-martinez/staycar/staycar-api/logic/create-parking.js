const { validate } = require('staycar-utils')
const { models: { User, Parking } } = require('staycar-data')

module.exports = (id, pkName, price, totalLots) => {
    validate.string(id, 'id')
    validate.string(pkName, 'pkName')
    validate.type(price, "price", Number)
    validate.type(totalLots, "totalLots", Number)

    return (async () => {
        const user = await User.find({id})
        if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

        let lots = []

        for (let i = 1; i <= totalLots; i++) {
            let lot = {}
            lot.number = i
            lot.status = false
      
            lots.push(lot)
          }
    
        return await Parking.create({ parkingName: pkName, rate: price, totalLots, lots })
        
    })()
}