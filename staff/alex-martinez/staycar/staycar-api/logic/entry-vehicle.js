const { validate } = require('staycar-utils')
const { models: { Ticket } } = require('staycar-data')
const { NotAllowedError } = require('../../staycar-errors')

module.exports = (carPlate) => {
  
    validate.string(carPlate, 'carPlate')
    
    return Ticket.findOne({ carPlate })
    .then(car => {
        if (car) throw new NotAllowedError(`this plate ${carPlate} is inside`)
    })
    .then(() => {
        const ticket = new Ticket({ car_plate: carPlate, entry_hour: new Date() })
        
        return ticket.save()
    })
    .then(()=>{})
}