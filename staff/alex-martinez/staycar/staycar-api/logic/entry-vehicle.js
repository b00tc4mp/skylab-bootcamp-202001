const { validate } = require("staycar-utils")
const { models: { Ticket, Parking } } = require("staycar-data")
const { NotAllowedError } = require("../../staycar-errors")
const generateQr = require("./generate-qr")

module.exports = async (carPlate, idParking) => {
  validate.string(carPlate, "carPlate")
  validate.string(idParking, "idParking")

  const car = await Ticket.findOne({ carPlate })
  if (car) throw new NotAllowedError(`this plate ${carPlate} is inside`)

  const parking = await Parking.findOne({ _id: idParking })

  let { totalLots, occupiedLots, lots } = parking

  let freeLots = totalLots - occupiedLots

  if (freeLots === 0)
    throw new NotAllowedError("parking full. Entry not allowed")

  parking.occupiedLots++
  console.log(parking)

  let condition = true

  do {
    let random = Math.floor(Math.random() * lots.length)

    if (lots[random].status === false) {
      lots[random].status = true
      condition = false
    }
    
  } while (condition);

  parking.lots = lots

  await generateQr(carPlate)

  await Ticket.create({ carPlate, entryHour: new Date() })

  await parking.save()

}
