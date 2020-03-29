const { validate } = require('events-utils')
const { models: {User, Event} } = require('events-data')
const { NotFoundError } = require('events-errors')
module.exports = (idUser, idEvent, body) => {
    const {title, description, location, date} = body
    const _event = {}
    if (typeof title !== "undefined"){
        validate.string(title, 'title')
        _event["title"] = title
    }
    if (typeof description !== "undefined"){
        validate.string(description, 'description')
        _event["description"] = description
    }
    if (typeof location !== "undefined"){
        validate.string(location, 'location')
        _event["location"] = location
    }
    if (typeof date !== "undefined"){
        validate.string(date, 'date')
        _event["date"] = date
    }
    validate.string(idUser, 'idUser')
    validate.string(idEvent, 'idEvent')
    //debugger
    return User.findById(idUser)
        .then(user => {
            //if (user.publishedEvents: (ObjectId(idEvent))) throw new NotFoundError(`User with id ${idUser} cannot update this event`)
            return Event.findByIdAndUpdate(idEvent, {$set: _event })
        })
        .then(() => {
            return Event.findById(idEvent)
        })
}
