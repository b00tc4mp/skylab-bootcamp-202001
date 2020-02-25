const { authenticateUser } = require('../logic')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { body: { username, password }, session } = req

    try {
        authenticateUser(username, password, (error, token) => {
            if (error) {
                logger.warn(error)

                const { message } = error
                const { session: { acceptCookies } } = req

                return res.render('login', { acceptCookies, error: message })
            }
        })

        session.token = token

        session.save(() => {
            const { fav } = session

            if (fav) return res.redirect(307, `/toggle-fav/${fav}`)

            return res.redirect('/')
        })
    } catch (error) {
        logger.error(error)

        const { message } = error
        const { session: { acceptCookies } } = req

        return res.render('login', { acceptCookies, error: message })
    }
}