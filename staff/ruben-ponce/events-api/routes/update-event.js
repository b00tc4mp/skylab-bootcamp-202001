const { updateEvent } = require('../logic')

module.exports = (req, res) => {
    
    const { payload: { sub: userId }, body: { event: eventId, title, description, location, date} } = req

    try {
        
        updateEvent(userId, eventId, title, description, location, date)
            .then(event => {

                res.status(200).json(event)
            })
            .catch(({ message }) =>
                res
                    .status(401)
                    .json({
                        error: message
                    })
            )
    } catch ({ message }) {
        res
            .status(401) //?
            .json({
                error: message
            })
    }
}