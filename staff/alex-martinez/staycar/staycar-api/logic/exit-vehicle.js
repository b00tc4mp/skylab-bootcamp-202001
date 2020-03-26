const { validate } = require("staycar-utils")
const { models: { Ticket, Parking } } = require("staycar-data")
const { NotAllowedError } = require("../../staycar-errors")

/**
 * Exit vehicle
 * 
 * @param {string} ticketId ticket id
 * @param {string} parkingName parking name
 * 
 * @throws {NotAllowedError} if ticket id is not valid
 * @throws {NotAllowedError} if ticket was not validated
 * @throws {NotAllowedError} if ticket outside the parking yet 
 */

module.exports =  (ticketId, parkingName) => {
  validate.string(ticketId, "ticket id")
  validate.string(parkingName, 'parking name')
  
  return (async () => {

    const ticket = await Ticket.findOne({ ticketId })
    if (!ticket) throw new NotAllowedError(`this ticket ${ticketId} is not valid`)
    if(!ticket.validated) throw new NotAllowedError('this ticket was not validated')
    if(ticket.exit) throw new NotAllowedError('this ticket is not allowed')

    let now = new Date()
    let valid = ticket.validatedTime
    let diff = now.getTime() - valid.getTime()
    let minutes = Math.floor(diff / 60000);
    
    if(minutes > 1){
      ticket.validated = false
      await ticket.save()
      throw new NotAllowedError('validation expired, please got to ATM')
    } 
  
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

    ticket.exit = true
    
    ticket.save()
    
    parking.save()
  })()
}
