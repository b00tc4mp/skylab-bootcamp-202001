const {fork}= require('child_process')
const { startDrone } = require('./../../logic')
const { NotAllowedError, WifiError, DroneError } = require('./../../../Js-Drone-ERRORS')



   

module.exports = (req, res) => {

    const { body: { port, httpPort } } = req
   
    
    const ps = fork('./pc.js', [port, httpPort])
    ps.on('message', message =>{
        console.log(`Received from Child: ${message}`)
    })

    ps.on('close', (exitCode, signal)=>{
        console.log(exitCode, signal)
    })
    
}