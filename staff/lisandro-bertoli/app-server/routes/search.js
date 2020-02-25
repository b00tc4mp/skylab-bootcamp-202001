const { retrieveUser, searchVehicles } = require('../logic')
const { App, Landing } = require('../components')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { query: { query }, session } = req
    const { token } = session
    if (token) {
        try {
            retrieveUser(token, (error, user) => {
                if (error) {
                    logger.error(error)

                    res.redirect('/error')
                }

                const { username, name } = user

                try {
                    searchVehicles(token, query, (error, vehicles) => {
                        if (error) {
                            logger.error(error)

                            res.redirect('/error')
                        }

                        const { acceptCookies } = session

                        session.query = query

                        res.send(App({ title: 'Landing', body: Landing({ vehicles, name, username }), acceptCookies }))
                    })

                } catch (error) {
                    logger.error(error)

                    res.redirect('/error')
                }
            })
        } catch (error) {
            logger.error(error)

            res.redirect('/error')
        }
    } else {
        try {
            searchVehicles(undefined, query, (error, vehicles) => {
                if (error) {
                    logger.error(error)

                    res.redirect('/error')
                }

                session.query = query

                const { acceptCookies } = session
                debugger
                res.render('landing', { acceptCookies, results: vehicles, query })
            })

        } catch (error) {
            logger.error(error)

            res.redirect('/error')
        }
    }
}