const { validate } = require('staycar-utils')
const { models: { Ticket } } = require('staycar-data')
const { NotFoundError } = require('staycar-errors')

module.exports = (idTicket) => {

    validate.string(idTicket, 'idTicket')

    return (async () => {
        const ticket = await Ticket.findById(idTicket)
        if(!ticket) throw new NotFoundError(`ticket with id ${id} does not exist`)

        ticket.validated = true
        
        
        await ticket.save()
        return ticket
    })()
}