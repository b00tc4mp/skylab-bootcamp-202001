const { authenticateUser } = require('../logic')
const { App, Login } = require('../components')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { body: { username, password }, session } = req

    try {
        authenticateUser(username, password, (error, token) => {
            if (error) {
                logger.warn(error)

                const { message } = error
                const { acceptCookies } = session

                return res.render('login', { error: message, acceptCookies })
            }

            session.token = token

            const { favId } = session

            if (favId) return res.redirect(307, `/toggle-favorite/${favId}`)

            res.render('/')

        })
    } catch (error) {
        logger.warn(error)

        const { message } = error
        const { acceptCookies } = session

        return res.render('login', { error: message, acceptCookies })
    }
}