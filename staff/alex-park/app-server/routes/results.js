const { searchVehicles } = require('../logic')
const { App, Search } = require('../components')

module.exports = (req, res) => {
    const { query: { query }, session: { token, acceptCookies, name, username } } = req
    if (typeof req.session.query === 'undefined') {
        req.session.query = query
    }
    
    try {
        searchVehicles(token, query, (error, vehicles) => {
            if (error) {
                const { message } = error
    
                return res.send(App({ title: 'Search', body: Search({ error: message, name, username }), acceptCookies }))
            } else {
                return res.send(App({ title: 'Search', body: Search({ name, username, vehicles }), acceptCookies }))
            }
        })
    } catch({ message }) {
        return res.send(App({ title: 'Search', body: Search({ error: message, name, username }), acceptCookies }))
    }
}