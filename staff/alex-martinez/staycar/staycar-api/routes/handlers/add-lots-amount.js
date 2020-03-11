const { addLotsAmount } = require('../../logic')
const { NotAllowedError, ContentError } = require('staycar-errors')

module.exports = ( req, res ) => {
    const { payload: { sub: id } , body: { totalLots } } = req
    
    let pkname = req.params.name
    try{
        addLotsAmount(id, pkname ,totalLots)
        .then(() => res.status(200).end())
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
    
    }catch(error){
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
