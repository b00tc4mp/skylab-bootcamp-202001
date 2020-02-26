const { retrieveUser, searchVehicles } = require('../logic')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { query: { query }, session } = req
    const { token } = session
    if (token) {
        try {
            retrieveUser(token)
                .then(user => {
                    const { username, name } = user

                    try {
                        return searchVehicles(token, query)
                            .then(vehicles => {
                                const { acceptCookies } = session

                                session.query = query

                                res.render('landing', { results: vehicles, name, username, acceptCookies, query })
                            })

                    } catch (error) {
                        logger.error(error)

                        res.redirect('/error')
                    }
                })
                .catch(error => {
                    logger.error(error)

                    res.redirect('/error')
                })
        } catch (error) {
            logger.error(error)

            res.redirect('/error')
        }
    } else {
        try {
            searchVehicles(undefined, query)
                .then(vehicles => {
                    session.query = query

                    const { acceptCookies } = session

                    res.render('landing', { acceptCookies, results: vehicles, query })
                })
                .catch(error => {
                    logger.error(error)

                    res.redirect('/error')
                })
        } catch (error) {
            logger.error(error)

            res.redirect('/error')
        }
    }
}