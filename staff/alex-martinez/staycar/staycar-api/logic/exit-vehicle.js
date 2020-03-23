const { validate } = require("staycar-utils")
const { models: { Ticket, Parking } } = require("staycar-data")
const { NotAllowedError } = require("../../staycar-errors")

module.exports =  (ticketId, parkingName) => {
  validate.string(ticketId, "ticket id")
  validate.string(parkingName, 'parking name')
  
  return (async () => {

    const ticket = await Ticket.findOne({ ticketId })
    if (!ticket) throw new NotAllowedError(`this ticket ${ticketId} is not valid`)
    if(!ticket.validated) throw new NotAllowedError('this ticket was not validated')
    if(ticket.exit) throw new NotAllowedError('this ticket is not allowed')
  
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
