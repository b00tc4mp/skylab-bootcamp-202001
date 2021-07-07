const { searchVehicles, retrieveUser } = require('../logic')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { query: { query }, session: { token } } = req

    if (token) {
        try {
            retrieveUser(token)
            .then(user => {
                const { name, username } = user

                searchVehicles(token, query)
                .then(vehicles => {
                    const { session: { acceptCookies } } = req
                    res.render('landing', { name, username, query, results: vehicles, acceptCookies })
                })
                .catch(error => {
                    logger.error(error)
                    res.redirect('/error')
                })

            })
            .catch(error => {
                logger.error(error)
                res.redirect('/error')
            })
        } catch ({ message }) {
            logger.error(message)
            res.redirect('/error')
        }

    } else {
        try {
            searchVehicles(undefined, query)
            .then(vehicles => {
                const { session: { acceptCookies } } = req
                res.render('landing', { query, results: vehicles, acceptCookies })
            })
        } catch ({message}) {
            logger.error(message)
            res.redirect('/error')
        }
    }
}