const { retrieveVehicle } = require('../logic')

module.exports = (req, res) => {
    const { session: { token, acceptCookies, query, name, username }, params: { id } } = req
    
    try {
        retrieveVehicle(token, id, (error, vehicle) => {
            if (error) {
                const { message } = error
                return res.send(App({ title: 'Search', body: Search({ error: message, name, username }), acceptCookies }))
            }

            res.send(App({ title: 'Details', body: Details({ vehicle, query, username }), acceptCookies }))
        })
            
    } catch ({ message }) {
        return res.send(App({ title: 'Search', body: Search({ error: message, name, username }), acceptCookies }))
    }
}