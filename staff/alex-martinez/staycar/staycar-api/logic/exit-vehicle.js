const { validate } = require("staycar-utils")
const { models: { Ticket, Parking } } = require("staycar-data")
const { NotAllowedError } = require("../../staycar-errors")

module.exports =  (carPlate, parkingName) => {
  validate.string(carPlate, "carPlate")
  validate.string(parkingName, 'parkingName')
  
  return (async () => {

    const ticket = await Ticket.findOne({ carPlate })
    if (!ticket) throw new NotAllowedError(`this plate ${carPlate} is not valid`)
    if(!ticket.validated) throw new NotAllowedError('this ticket was not validated')
  
    const parking = await Parking.findOne({ parkingName })
    
    let { lots } = parking
  
  
    parking.occupiedLots--
  
    let condition = false
  
    do {
    
      let random = Math.floor(Math.random() * lots.length)
  
      if (lots[random].status === true) {
        lots[random].status = false
        
        condition = true
      }
      
    } while (condition===false);
  
    parking.lots = lots


    //HACER EL REPORT AQUI
    parking.save()
  })()
}
