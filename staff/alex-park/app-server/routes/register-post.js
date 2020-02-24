const { registerUser } = require('../logic')
const { App, Register } = require('../components') 

module.exports = (req, res) => {
    const { name, surname, username, password } = req.body

    try {
        registerUser(name, surname, username, password, error => {
            if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
            } else {
                res.redirect('/login')
            }
        })
    } catch ({ message }) {
        const { session: { acceptCookies } } = req

        return res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
    }
}