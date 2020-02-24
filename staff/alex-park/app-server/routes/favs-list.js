const { searchFavs } = require('../logic')
const { App, Search, FavsList } = require('../components')

module.exports = (req, res) => {
    const { session: { token, acceptCookies, name, username, query } } = req
    
    try {
        searchFavs(token, (error, listOfFavs) => {
            if (error) {
                const { message } = error
                return res.send(App({ title: 'Search', body: Search({ error: message, name, username }), acceptCookies }))
            } 
            
            return res.send(App({ title: 'Favorites List', body: FavsList({ listOfFavs, username, query }), acceptCookies }))
        })

    } catch ({ message }) {
        return res.send(App({ title: 'Search', body: Search({ error: message, name, username }), acceptCookies }))  
    }

}