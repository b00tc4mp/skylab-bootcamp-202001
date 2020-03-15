const { createBooking } = require('../../logic')
const { ContentError } = require('share-my-spot-errors')

module.exports = (req, res) => {
    const { params: { id }, body: { publisher, listingId, dateStarts, dateEnds, status } } = req
    
    try {
        createBooking(id, publisher, listingId, dateStarts, dateEnds, status)
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