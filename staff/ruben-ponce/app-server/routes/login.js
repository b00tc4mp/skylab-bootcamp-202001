const { App, Login } = require('../components')

module.exports = (req, res) => {
    const { session: { username } } = req

    if (username) return res.redirect(`/search/${username}`)

    const { session: { acceptCookies } } = req

    res.send(App({ title: 'Login', body: Login(), acceptCookies }))
}