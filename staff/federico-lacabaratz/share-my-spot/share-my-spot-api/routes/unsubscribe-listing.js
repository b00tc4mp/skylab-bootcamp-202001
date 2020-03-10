const { unsubscribelisting } = require('../logic')
const { NotFoundError } = require('listings-errors')

module.exports = (req, res) => {
    const { payload: { sub: userId }, body: {listingId} } = req

    try {
        unsubscribelisting(userId, listingId)
            .then(() =>
                res.status(200).json({ message: "You've successfully unsubscribe this listing from the database" })
            )
            .catch(({ message }) =>
                res
                    .status(401)
                    .json({
                        error: message
                    })
            )
    } catch (error) {
        let status = 400

        switch (true) {
            case error instanceof NotFoundError:
                status = 404 // not found
                break
        }

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}