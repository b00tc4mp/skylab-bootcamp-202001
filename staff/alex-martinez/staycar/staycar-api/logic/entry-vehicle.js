const { validate } = require("staycar-utils")
const { models: { Ticket, Parking } } = require("staycar-data")
const { NotAllowedError } = require("../../staycar-errors")
//const generateQr = require("./generate-qr")

module.exports =  (carPlate, parkingName) => {
  validate.string(carPlate, "carPlate")
  validate.string(parkingName, 'parkingName')
  
  return (async () => {

    const car = await Ticket.findOne({ carPlate })
    if (car) throw new NotAllowedError(`this plate ${carPlate} is inside`)
  
    const parking = await Parking.findOne({ parkingName })
    
    let { totalLots, occupiedLots, lots } = parking
  
    let freeLots = totalLots - occupiedLots
  
    if (freeLots === 0)
      throw new NotAllowedError("parking full. Entry not allowed")
  
    parking.occupiedLots++
  
    let condition = true
  
    do {
      let random = Math.floor(Math.random() * lots.length)
  
      if (lots[random].status === false) {
        lots[random].status = true
        
        condition = false
      }
      
    } while (condition);
  
    parking.lots = lots
  
    //await generateQr(carPlate)
  
    await Ticket.create({ carPlate, entryHour: new Date(), parkingName })
    //entryHour = moment().format('MMMM Do YYYY, h:mm:ss')
    //await Ticket.create({ carPlate, entryHour, parkingName })
  
    parking.save()
  })()
}
