const {toggleFavVehicle} = require('../logic')
const { App, Search} = require('../components')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { session: { name, username, token, acceptCookies, query }, params: { id } } = req

    try {
        toggleFavVehicle (token, id, error => {
            if(error) {
                const { message } = error
                return res.send(App({ title: 'Search', body: Search ({  name, username, error: message }), acceptCookies }))
            }
            res.redirect(req.get('referer'))
        })
    } catch ({error}){
        res.send(App({ title: 'Search', body: Search ({  name, username, error: message }), acceptCookies }))
    }
}