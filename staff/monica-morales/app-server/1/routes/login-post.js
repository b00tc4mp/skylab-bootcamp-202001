const { authenticateUser } = require('../logic')
const { App, Login } = require('../components')
const { logger } = require('events-utils')

module.exports = (req, res) => {
    const { body: { username, password }, session } = req

    try {
        authenticateUser(username, password) 
        .then( token => {
                      
            session.token = token

            session.save(() => {
                const { fav } = session

                if (fav) return res.redirect(307, `/toggle-fav/${fav}`)

               return res.redirect('/')
            })

        }).catch(()=>{
            logger.warn(error)

                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Login', body: Login({ error: message, username }), acceptCookies }))
        })
    } catch (error) {
        logger.error(error)

        const { message } = error
        const { session: { acceptCookies } } = req

        res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
    }
}