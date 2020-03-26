const { validate } = require("staycar-utils")
const { models: { User, Parking } } = require("staycar-data")
const { NotFoundError } = require("staycar-errors")

module.exports = (id, parkingName,rate, totalLots) => {
  validate.string(id, "id")
  validate.string(parkingName, "parking name")
  validate.type(totalLots, "total lots", Number)
  validate.type(rate, "rate", Number)
  
  if (totalLots <= 0) throw new TypeError("the number of lots must be bigger than 0")
  
  if(rate <= 0) throw new TypeError("rate must be bigger than 0")

  return (async () => {
    
    const user = await User.findById( id )
    
    if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

    const parking = await Parking.findOne({ parkingName})
    
    if (!parking)
      throw new NotFoundError(`parking with name ${parkingName} does not exist`)
    
    let lots = []

    for (let i = 1; i <= totalLots; i++) {
        let lot = {}
        lot.number = i
        lot.status = false

        lots.push(lot)
    }

    await parking.updateOne({rate, totalLots, lots})

  })();
};
