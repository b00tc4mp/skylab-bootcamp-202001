const { validate } = require("staycar-utils")
const { models: { User, Parking } } = require("staycar-data")
const { NotFoundError } = require("staycar-errors")

module.exports = (id, nameParking, number) => {
  validate.string(id, "id")
  validate.string(nameParking, "nameParking")
  validate.type(number, "number", Number)
  if (number <= 0)
    throw new TypeError("the number of lots must be biger than 0")

  return (async () => {
    
    const user = await User.findById( id )
    
    if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

    const parking = await Parking.findOne({ parkingName: nameParking })
    
    if (!parking)
      throw new NotFoundError(`parking with name ${name} does not exist`)

    let { lots } = parking

    parking.totalLots = number
    
    if (number < lots.length) {
      let difLots = lots.length - number

      for (let i = lots.length+1; i >= difLots; i--) {
        lots.pop(i)
      }

      await parking.save()
      return 
    } 

    for (let i = lots.length + 1; i <= number; i++) {
      let lot = {}
      lot.number = i
      lot.status = false

      lots.push(lot)
    }

    await parking.save()

    return parking
  })();
};
