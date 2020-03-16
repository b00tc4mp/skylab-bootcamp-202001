const { validate } = require('./../../Js-Drone-UTILS')
const { models: { User, Session } } = require('./../../Js-Drone-DATA')
const { mongoose: { Types: { ObjectId } } } = require('./../../Js-Drone-DATA')
const { NotFoundError } = require('./../../Js-Drone-ERRORS')

module.exports = (sub, time, lowTempP, hightTempP, batteryP, heightP, speedP, atmosPressureP, date) => {
    
    // validate.type(height, 'height', Number)
    // validate.type(speed, 'speed', Number)
    // validate.type(time, 'time', Number)
    // validate.type(temperature, 'temperature', Number)
    // validate.type(date, 'date', Date)

    return User.findById(sub)
        .then(async (user) => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            await user.sessions.push({ time, lowTempP, hightTempP, batteryP, heightP, speedP, atmosPressureP, date })

            

            await user.save()
        })
        .then(() => { })
}