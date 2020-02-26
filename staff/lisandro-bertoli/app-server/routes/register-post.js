const { registerUser } = require('../logic')
const { logger } = require('../utils')


module.exports = (req, res) => {
    const { name, surname, username, password } = req.body

    try {
        registerUser(name, surname, username, password, (error, ) => {
            if (error) {
                logger.warn(error)

                const { message } = error
                const { acceptCookies } = req.session

                return res.render('register', { error: message, acceptCookies })
            }

            return res.redirect('/login')
        })
    } catch (error) {
        logger.warn(error)

        const { message } = error
        const { acceptCookies } = req.session

        return res.render('register', { error: message, acceptCookies })
    }
}