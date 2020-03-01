const { retrieveLastEvents } = require('../logic')

module.exports = (req, res) => {
    
    const { payload: { sub: id } } = req

    try {
        
        retrieveLastEvents()
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