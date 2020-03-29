const { playCombination } = require('../../logic')
const { NotFoundError ,ContentError } = require('simonline-errors')

module.exports = (req, res) => {
    const {  params: { gameId } , body: { combination } } = req
    
    try {
        return playCombination(gameId, combination)
        .then(status => res.status(200).json(status))
        .catch(error => {
            let status = 400
            console.log('catch after playCombination finished in api===> ', error)
            const { message } = error
            
            if (error instanceof NotFoundError)
                status = 404

            res.status(status).json({error: message})})
    } catch (error) {
        let status = 400
        console.log('syncronosus catch on api handler===>>', error)
        if (error instanceof TypeError || error instanceof ContentError)
            status = 406 // not acceptable

        const { message } = error

        res.status(status).json({error: message})
    }
}