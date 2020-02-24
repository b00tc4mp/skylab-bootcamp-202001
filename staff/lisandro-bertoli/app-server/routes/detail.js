const { retrieveVehicle, retrieveUser } = require('../logic')
const { App, Landing } = require('../components')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { params: { id }, session: { token, acceptCookies } } = req
    if (token) {
        try {
            retrieveUser(token, (error, user) => {
                if (error) {
                    logger.error(error)

                    res.redirect('/error')
                }

                const { username, name } = user

                retrieveVehicle(token, id, (error, vehicle) => {
                    if (error) {
                        logger.error(error)

                        return res.redirect('/error')
                    }

                    res.send(App({ title: 'Details', body: Landing({ vehicle, name, username }), acceptCookies }))

                })

            })
        } catch (error) {
            logger.error(error)

            return res.redirect('/error')
        }
    } else {
        try {
            retrieveVehicle(undefined, id, (error, vehicle) => {
                if (error) {
                    logger.error(error)

                    return res.redirect('/error')
                }

                res.send(App({ title: 'Details', body: Landing({ vehicle }), acceptCookies }))

            })
        } catch (error) {
            logger.error(error)

            res.redirect('/error')
        }

    }
}