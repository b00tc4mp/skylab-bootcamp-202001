const { retrieveUser } = require('../../logic')
const { NotAllowedError } = require('./../../../Js-Drone-ERRORS')

module.exports = (req, res) => {
    
    const { payload: { sub: id } } = req
    
    try {
        retrieveUser(id)
            .then(user =>{
                res.status(200).json(user)
                // console.log(user.sessions[0].heightP.length)
            })
            .catch(error => {
                
                let status = 401

                if (error instanceof NotAllowedError)
                    
                    status = 402 // not authorized

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