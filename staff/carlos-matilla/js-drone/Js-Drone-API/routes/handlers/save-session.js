const { saveSession } = require('../../logic')
const { ContentError } = require('./../../../Js-Drone-ERRORS')

module.exports = (req, res) => {
    const { payload: { sub }, body: { time, control, lowTempP, hightTempP, batteryP, heightP, speedP, atmosPressureP } } = req

    try {
        saveSession(sub, time, control, lowTempP, hightTempP, batteryP, heightP, speedP, atmosPressureP, date = new Date())
            .then(() => res.status(201).end())
            .catch(error => {
                let status = 400

                const { message } = error

                res
                    .status(status)
                    .json({
                        error: message
                    })
            })
    } catch (error) {
        let status = 400

        if (error instanceof TypeError || error instanceof ContentError)
            status = 406 // not acceptable

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}