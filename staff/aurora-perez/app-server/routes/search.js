const { searchVehicles } = require('../logic')
const { App, Search } = require ('../components')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { query: {query}, session: { token, acceptCookies, name, username } } = req
    req.session.query = query

    try {
        searchVehicles ( token, query, (error, vehicles) => {
            if (error) {
                const { message } = error

                return res.send(App({ title: 'Search', body: Search({ name, username, error: message }), acceptCookies }))
            }
            res.send(App({ title: 'Search', body: Search({ name, username, vehicles }), acceptCookies }))
        })
    }catch( {message} ){
        return res.send(App({ title: 'Search', body: Search({ name, username, error: message }), acceptCookies }))
    }

}