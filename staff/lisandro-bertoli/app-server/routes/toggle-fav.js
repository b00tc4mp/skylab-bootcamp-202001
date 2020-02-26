const { toggleFavVehicle } = require('../logic')
const { logger } = require('../utils')

module.exports = (req, res) => {
    const { params: { id }, session } = req

    const { token } = session

    if (!token) {
        session.referer = req.get('referer')
        session.favId = id

        return res.redirect('/login')
    }

    try {
        toggleFavVehicle(token, id)
            .then(() => {
                const { referer = req.get('referer') } = session

                delete session.referer
                delete session.favId

                res.redirect(referer)
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