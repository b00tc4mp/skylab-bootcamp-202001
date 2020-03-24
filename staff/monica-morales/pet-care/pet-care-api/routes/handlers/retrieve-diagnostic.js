const { retrieveDiagnostic } = require ('../../logic')
const { NotAllowedError } = require('pet-care-errors')

module.exports = (req, res) => {

    const {params: {idDiagnostic,idPet, id}} = req
  
    try {
        
        retrieveDiagnostic(idDiagnostic, idPet, id)

            .then(diagnostic =>
                res.json(diagnostic)
            )
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 409 

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
            status = 406 

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
        
    }
}