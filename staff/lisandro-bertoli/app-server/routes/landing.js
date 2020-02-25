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

            return res.render('landing', { username, name, acceptCookies })
        })
    } else {
        return res.render('landing', { acceptCookies })
    }
}