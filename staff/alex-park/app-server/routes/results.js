const { searchVehicles, retrieveUser } = require('../logic')
const { App, Landing } = require('../components')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { query: { query }, session: { token, acceptCookies, name, username } } = req
    if (typeof req.session.query === 'undefined') {
        req.session.query = query
    }
    
    if (token) {
        try {
            retrieveUser(token, (error, user) => {
                if(error) {
                    logger.error(error)

                    res.redirect('/error')
                }

                try {
                    searchVehicles(token, query, (error, vehicles) => {
                        if (error) {
                            logger.error(error)
                
                            res.redirect('/error')
                        } else {
                            res.send(App({ title: 'Search', body: Landing({ name, username, vehicles, query }), acceptCookies }))
                        }
                    })

                } catch ( error ) {
                    logger.error(error)
                
                    res.redirect('/error')
                }
            })
        } catch({ message }) {
            logger.error(error)
                
            res.redirect('/error')
        }

    } else {
        try {
            searchVehicles(undefined, query, (error, vehicles) => {
                const { session: { acceptCookies } } = req

                if (error) {
                    logger.error(error)

                    res.redirect('/error')
                }

                res.send(App({ title: 'Search', body: Landing({ query, vehicles }), acceptCookies }))
            })
        } catch (error) {
            logger.error(error)

            res.redirect('/error')
        }
    }
}