const { retrieveUser } = require('../logic')
const { App, Search } = require('../components')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { params: { username }, session: { token } } = req

    retrieveUser(token, (error, user) => {
        if (error) {
            const { message } = error
            const { session: { acceptCookies } } = req

            return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
        }
        
        const { username: _username } = user

        req.session.name = user.name
        req.session.username = user.username

        if (username === _username) {
            const { name } = user
            
            const { session: { acceptCookies } } = req
            debugger
            res.send(App({ title: 'Search', body: Search({ name, username }), acceptCookies }))
        } else res.redirect('/login')
    })
}