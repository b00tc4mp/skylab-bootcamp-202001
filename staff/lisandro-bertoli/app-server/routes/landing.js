const { retrieveUser } = require('../logic')
const { App, Landing } = require('../components')
const { logger } = require('../utils')

module.exports = ({ session: { acceptCookies, token } }, res) => {
    if (token) {
        retrieveUser(token, (error, user) => {
            if (error) {
                logger.error(error)

                res.redirect('/error')
            }
            const { username, name } = user

            return res.send(App({ title: 'Landing', body: Landing({ username, name }), acceptCookies }))
        })
    } else {
        res.send(App({ title: 'Landing', body: Landing(), acceptCookies }))
    }
}