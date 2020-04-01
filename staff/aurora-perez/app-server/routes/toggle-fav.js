const {toggleFavVehicle} = require('../logic')
const { logger } = require('events-utils')

module.exports = (req, res) => {
    const { session, params: { id } } = req
    const { token } = session

    if(!token) {
        session.referer = req.get('referer')

        session.fav = id 

        return session.save(() => res.redirect('/login'))
    }
    debugger
    try {
        toggleFavVehicle (token, id)
        .then( () => {
            const { referer = req.get('referer') } = session

            delete session.referer
            delete session.fav

            session.save(() => res.redirect(referer))
        })
        .catch(error => {
           logger.error(error)

            res.redirect('./error') 
        })
    } catch ({error}){
        logger.error(error)

        res.redirect('/error')
    }
}