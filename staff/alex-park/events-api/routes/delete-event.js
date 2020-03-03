const { deleteEvent } = require('../logic')
const { NotAllowedError, NotFoundError} = require('../errors')

module.exports = (req, res) => {
    const {payload: {sub: userId}, body: {eventId}} = req

    try {
        deleteEvent(userId, eventId)
        .then(()=> res.status(200).end())
        .catch(error => {
            let status = 400
            return res.status(status).json({error: error.message})
        })
        
    } catch (error) {
        let status = 400
        return res.status(status).json({error: error.message})
        
    }

}
