const { retrieveFavVehicles } = require ('../logic')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { session: { name, username, token, acceptCookies, query }, params: { id }} = req

    try{
        retrieveFavVehicles(token, (error, favsList) => {
            if (error) {
                const { message } = error
                return res.send(App({ title: 'Search', body: Search ({  name, username, error: message }), acceptCookies }))
            }
            res.send(App({ title: 'Favorites', body: Favorites ({ favsList, query }), acceptCookies }))
        })
    }catch({message}){
        res.send(App({ title: 'Search', body: Search ({  name, username, error: message }), acceptCookies }))
    }

}