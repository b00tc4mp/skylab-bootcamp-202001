const { start } = require('../../logic')
const { NotFoundError ,ContentError } = require('simonline-errors')

module.exports = (req, res) => {
    const { params: { gameId } } = req

    try {
        start(gameId)
            .then(firstStatus => 
                res.status(200).json(firstStatus)
            )
            .catch(error => {
                let status = 400

                const { message } = error
                
                if (error instanceof NotFoundError)
                    status = 404

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