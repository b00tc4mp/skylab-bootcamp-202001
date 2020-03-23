const { retrievePlayersName } = require('../../logic')
const { NotAllowedError, ContentError } = require('simonline-errors')

module.exports = (req, res) => {
    const { params: { gameId } } = req

    try {
        retrievePlayersName(gameId)
            .then(game =>
                res.status(200).json(game)
            )
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 401 // not authorized

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