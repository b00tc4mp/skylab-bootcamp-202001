const {fork}= require('child_process')


module.exports = (req, res) => {

    const ps = fork('./start-drone.js')
    ps.on('message', (message )=>{
        res.status(200).json({ message })
    })

    ps.on('close', (exitCode, signal)=>{
        console.log(exitCode, signal)
    })
    
}