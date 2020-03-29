const { retrievePatientInfo } = require('../../logic')
const { NotAllowedError, NotFoundError, ContentError } = require('pill-o-clock-errors')

module.exports = (req, res )=> {
    const { payload: { sub: id }, params: {patientId} } = req

    try{
        retrievePatientInfo(id, patientId)
            .then(patientInfo => 
                res.status(200).json(patientInfo)
            )
            .catch(error =>{
                let status = 400
                switch (true) {
                    case error instanceof NotFoundError:
                        status = 404 // not found
                        break
                    case error instanceof NotAllowedError:
                        status = 403 // forbidden
                }
                const { message } = error
                res
                    .status(status)
                    .json({
                        error: message
                    })
            })
    } catch (error) {
        let status = 400

        switch (true) {
            case error instanceof NotFoundError:
                status = 404 // not found
                break
            case error instanceof NotAllowedError:
                status = 403 // forbidden
        }   
        const { message } = error
        res
            .status(status)
            .json({
                error: message
            })
    }
}