const { retrieveLastListings } = require('../../logic')
const {  ContentError } = require('share-my-spot-errors')

module.exports = (req, res) => {

    try {
        retrieveLastListings()
            .then(listing =>
                res.status(200).json(listing)
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
            case error instanceof ContentError:
                status = 406 // not allowed
                break
        }

        const {message} = error

        res
            .status(status)
            .json({ 
                error: message
            })
    }
}