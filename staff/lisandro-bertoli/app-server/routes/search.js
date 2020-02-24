const { retrieveUser, searchVehicles } = require('../logic')
const { App, Landing } = require('../components')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { query: { q }, session: { token } } = req
    if (token) {
        try {
            retrieveUser(token, (error, user) => {
                if (error) {
                    logger.error(error)

                    res.redirect('/error')
                }

                const { username, name } = user

                try {
                    searchVehicles(token, q, (error, vehicles) => {
                        const { session: { acceptCookies } } = req
                        if (error) {
                            logger.error(error)

                            res.redirect('/error')
                        }

                        req.session.query = q

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
            searchVehicles(undefined, q, (error, vehicles) => {
                const { session: { acceptCookies } } = req
                if (error) {
                    logger.error(error)

                    res.redirect('/error')
                }

                req.session.query = q

                res.send(App({ title: 'Landing', body: Landing({ vehicles }), acceptCookies }))
            })

        } catch (error) {
            logger.error(error)

            res.redirect('/error')
        }
    }
}