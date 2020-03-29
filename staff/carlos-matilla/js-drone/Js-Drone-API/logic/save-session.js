const { validate } = require('./../../Js-Drone-UTILS')
const { models: { User, Session } } = require('./../../Js-Drone-DATA')
const { mongoose: { Types: { ObjectId } } } = require('./../../Js-Drone-DATA')
const { NotFoundError } = require('./../../Js-Drone-ERRORS')

module.exports = (sub, time, control, lowTempP, hightTempP, batteryP, heightP, speedP, atmosPressureP, date) => {
    

    return User.findById(sub)
        .then(async (user) => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            await user.sessions.push({ time, control, lowTempP, hightTempP, batteryP, heightP, speedP, atmosPressureP, date })

            

            await user.save()
        })
        .then(() => { })
}