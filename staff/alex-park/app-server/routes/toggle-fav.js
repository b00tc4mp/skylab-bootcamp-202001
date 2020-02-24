const { toggleFavVehicle } = require('../logic')
const { App, Search } = require('../components')

module.exports = (req, res) => {
    const { session: { token, acceptCookies, name, username }, params: { id } } = req

    try {
        toggleFavVehicle(token, id, error => {
            if (error) {
                const { message } = error
                return res.send(App({ title: 'Search', body: Search({ error: message, name, username }), acceptCookies }))
            }

            res.redirect(req.get('referer'))
        })

    } catch({ message }) {
        res.send(App({ title: 'Search', body: Search({ error: message, name, username }), acceptCookies }))
    }
}