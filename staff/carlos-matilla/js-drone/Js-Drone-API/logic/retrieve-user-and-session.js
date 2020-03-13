const { models: { User, Session } } = require('./../../Js-Drone-DATA')
const { mongoose: { Types: { ObjectId } } } = require('./../../Js-Drone-DATA')
const { validate } = require('./../../Js-Drone-UTILS')
const { NotFoundError } = require('./../../Js-Drone-ERRORS')

module.exports = id => {
    validate.string(id, 'id')

    return Session.find({ user: ObjectId(id)})
        .lean()
        .then(session => {
            // sanitize
            session.forEach(session => {
                session.id = session._id.toString()

                delete session._id

                
            })

            return session
        })
        
}