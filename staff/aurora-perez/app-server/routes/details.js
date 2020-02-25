const { retrieveVehicle } = require ('../logic')
const { App, Details } = require ('../components')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { session: { token, acceptCookies, query }, params: { id } } = req

    try{
        retrieveVehicle(token, id, (error, vehicle) => {
            if(error) {
                const { message } = error
                return res.send(App({ title: 'Search', body: Search ({  name, username, error: message }), acceptCookies }))
            } 
            res.send(App({ title: 'Search', body: Details({ vehicle, query}), acceptCookies }))
        })
    }catch ({message} ){
        res.send(App({ title: 'Details', body: Details({ vehicle, query, error: message }), acceptCookies }))
    }
    
}