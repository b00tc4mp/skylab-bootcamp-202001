const { deleteEvent } = require('../logic')

module.exports = (req, res) => {
    
    const { payload: { sub: userId }, body: { event: eventId} } = req

    try {
        
        deleteEvent(userId, eventId)
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