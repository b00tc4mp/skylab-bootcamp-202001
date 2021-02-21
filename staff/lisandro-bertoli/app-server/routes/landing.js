const { retrieveUser } = require('../logic')
const { logger } = require('../utils')

module.exports = ({ session: { acceptCookies, token } }, res) => {
    if (token) {
        retrieveUser(token)
            .then(user => {
                const { username, name } = user

                return res.render('landing', { username, name, acceptCookies })
            })
            .catch(error => {
                logger.error(error)

                res.redirect('/error')
            })
    } else {
        return res.render('landing', { acceptCookies })
    }
}