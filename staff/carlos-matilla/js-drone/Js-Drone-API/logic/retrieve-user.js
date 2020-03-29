const { validate } = require('./../../Js-Drone-UTILS')
const { models: { User, Session } } = require('./../../Js-Drone-DATA')
const { NotFoundError, NotAllowedError } = require('./../../Js-Drone-ERRORS')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)
            user.sessions.forEach(session => {
                session.id = session._id.toString()
                delete session._id
            })
            
            // let sortedSessions = []
            // for(let i = user.sessions.length - 1; i >=0; i--){
            //     sortedSessions.push(user.sessions[i])
            // }
            // user.sessions = sortedSessions

            user.id = user._id.toString()
            delete user._id
            
            return user.save()
        })
        .then(({ name, surname, username, sessions}) => ({ name, surname, username, sessions}))
}