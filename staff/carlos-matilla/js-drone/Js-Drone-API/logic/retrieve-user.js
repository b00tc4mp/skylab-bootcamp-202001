const { validate } = require('./../../Js-Drone-UTILS')
const { models: { User, Session } } = require('./../../Js-Drone-DATA')
const { NotFoundError, NotAllowedError } = require('./../../Js-Drone-ERRORS')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)
            let sortedSessions = []
            debugger
            for(let i = user.sessions.length - 1; i >=0; i--){
                sortedSessions.push(user.sessions[i])
            }
            user.sessions = sortedSessions
            
            return user.save()
        })
        .then(({ name, surname, username, sessions}) => ({ name, surname, username, sessions}))
}