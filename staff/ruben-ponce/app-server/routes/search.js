const { retrieveUser, searchVehicles } = require('../logic')
const { App, Login, Search } = require('../components')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { params: { username }, session: { token, acceptCookies }, query } = req
    const _query = query.query

    retrieveUser(token, (error, user) => {

        if (error) {
            const { message } = error
            const { session: { acceptCookies } } = req

            return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
        }

        const { username: _username } = user

        if (username === _username) {
            const { name } = user

            if(_query){
                try {
                    searchVehicles(token, _query, (error, vehicles) => {
                        res.send(App({ title: 'Search', body: Search({name, username, vehicles, username}), session:{ token }, acceptCookies})) 
                    })
                } catch (error) {
                    return res.send(App({ title: 'Search', body: Search({ name, username, error }), session:{ token }, acceptCookies }))
                }

            } else return res.send(App({ title: 'Search', body: Search({ name, username, error }), session:{ token }, acceptCookies }))
        } else res.redirect('/login')
    })
}