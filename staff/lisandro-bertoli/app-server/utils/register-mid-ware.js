const registerUser = require('../logic/register-user')
const path = require('path')

function registerMidWare(req, res, next) {

    req.on('end', () => {
        try {
            const { name, surname, username, password } = req.body
            registerUser(name, surname, username, password)
            console.log('register finished')
            res.redirect('/index.html')
        } catch (error) {
            console.log(error)
        }
    })
}

module.exports = registerMidWare