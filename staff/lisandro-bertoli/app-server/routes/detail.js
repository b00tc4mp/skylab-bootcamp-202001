const { retrieveVehicle, retrieveUser } = require('../logic')
const { App, Landing } = require('../components')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { params: { id }, session: { token, acceptCookies } } = req
    debugger
    if (token) {
        try {
            retrieveUser(token)
                .then(user => {
                    const { username, name } = user

                    return retrieveVehicle(token)
                        .then(vehicle => {
                            res.send(App({ title: 'Details', body: Landing({ vehicle, name, username }), acceptCookies }))
                        })

                })
                .catch(error => {
                    logger.error(error)

                    res.redirect('/error')
                })
        } catch (error) {
            logger.error(error)

            return res.redirect('/error')
        }
    } else {
        try {
            retrieveVehicle(undefined, id)
                .then(vehicle => {
                    res.send(App({ title: 'Details', body: Landing({ vehicle }), acceptCookies }))
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