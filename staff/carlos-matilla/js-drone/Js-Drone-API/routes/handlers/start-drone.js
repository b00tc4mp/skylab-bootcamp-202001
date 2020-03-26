var fork = require("child_process").fork

const { startDrone } = require('../../logic')
const { NotAllowedError, WifiError, DroneError } = require('./../../../Js-Drone-ERRORS')


module.exports = (req, res) => {
  
    const { body: { port, httpPort } } = req
    try {
        startDrone(port, httpPort)
            .then((port => {
                
                res.status(200).json({ port })
            }))
            .catch(error => {
                let status = 400
                console.log(error)
                if (error instanceof NotAllowedError || WifiError || DroneError)
                    status = 409 // conflict

                const { message } = error

                res
                    .status(status)
                    .json({
                        error: message
                    })
            })
    }   catch (error) {
        
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