const { createDiet } = require('../../logic')
const { NotAllowedError, ContentError } = require('diet-yourself-errors')

module.exports = (req, res) => {
    const { body: { method, food, userId } } = req
    
    try {
        createDiet( method, food, userId )
            .then(response => res.status(201).end(response))
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 409 // conflict

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