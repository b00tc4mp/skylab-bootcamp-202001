const { validate } = require('staycar-utils')
const { models: { Ticket } } = require('staycar-data')
const { NotFoundError } = require('staycar-errors')

/**
 * Validate ticket
 * 
 * @param {string} ticketId ticket id
 * @throws {NotFoundError} if ticket is not exist
 */

module.exports = (ticketId) => {

    validate.string(ticketId, 'ticket id')

    return (async () => {
        const ticket = await Ticket.findOne({ticketId})
        if(!ticket) throw new NotFoundError(`ticket with id ${ticketId} does not exist`)

        ticket.validated = true
        
        
        await ticket.save()
        return ticket
    })()
}