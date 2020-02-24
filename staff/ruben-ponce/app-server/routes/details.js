const { retrieveVehicle, retrieveStyle } = require('../logic')

module.exports = (req, res) => {
    const { body: { id, username }, session: { token, acceptCookies } } = req
    
    retrieveVehicle(token, id, (error, vehicle) => {
        
        const { style } = vehicle

        retrieveStyle(style, (error, styles) => {
            
            res.send(App({ title: 'Details', body: Details({vehicle, styles, username}), session:{ token}, acceptCookies }))
        })
    })
}