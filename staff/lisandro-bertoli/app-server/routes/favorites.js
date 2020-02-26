const { retrieveFavorites } = require('../logic')
const { App, Favorites } = require('../components')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { session } = req

    try {
        const { token } = session

        retrieveFavorites(token)
            .then(favorites => {
                const { acceptCookies } = session


                res.render('favorites', { results: favorites, acceptCookies })
            })
            .catch(error => {
                logger.error(error)

                return res.redirect('/error')
            })
    } catch (error) {
        logger.error(error)

        return res.redirect('/error')
    }
}