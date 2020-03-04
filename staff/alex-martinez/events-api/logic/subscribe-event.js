const { models: { Event, User } } = require('events-data')
const { validate } = require('events-utils')
const {  NotAllowedError } = require('events-errors')

module.exports = (id, eventId) => {

    validate.string(id, 'userId')
    validate.string(eventId, 'eventId')
 

    return Event.find({ _id: eventId, subscribers: id })
        .then((event) => {
            console.dir(event)
            if (event.length > 0) throw new NotAllowedError(`user ${id} is already subscribed`)
        })
        .then(() => {
            return Event.findById( eventId )
            .then((event) => {
    
                event.subscribers.push( id )
                event.save()
            })
        }) 
        .then(() => {
            return User.findById( id )
            .then((user) => {

                user.subscribedEvents.push( eventId )
                user.save()
            })
        })
        .then(() => {})
        
    /* return Event.findById({ _id: eventId, subscribers: id })
        .then(event => {
            if (event) throw new NotAllowedError(`user ${id} is already subscribed`)
        })
        .then(() =>
            Event.update({  _id: eventId }, { $push: { subscribers: id }}, { new: true } )
                .then(result => {
                    if (!result) throw new NotFoundError(`event with id ${eventId} does not exist`)

                    return User.update({ id }, { $push: { subscribedEvents: eventId }}, {new: true})
                })

        )
        .then(() => { }) */
}