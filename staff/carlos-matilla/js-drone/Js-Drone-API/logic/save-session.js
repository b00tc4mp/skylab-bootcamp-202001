const { validate } = require('./../../Js-Drone-UTILS')
const { models: { User, Session } } = require('./../../Js-Drone-DATA')
const { mongoose: { Types: { ObjectId } } } = require('./../../Js-Drone-DATA')
const { NotFoundError } = require('./../../Js-Drone-ERRORS')

module.exports = (id, height, speed, time, temperature, date) => {
    validate.string(id, 'id')
    validate.type(height, 'height', Number)
    validate.type(speed, 'speed', Number)
    validate.type(time, 'time', Number)
    validate.type(temperature, 'temperature', Number)
    validate.type(date, 'date', Date)

    return User.findById(id)
        .then(async (user) => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const session = await Session.create({ user: id, height, speed, time, temperature, date })

            user.sessions.push(session.id)

            await user.save()
        })
        .then(() => { })
}