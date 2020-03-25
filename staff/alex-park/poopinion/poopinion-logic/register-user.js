const { validate } = require ('poopinion-utils')
const fetch = require('node-fetch')

/**
 * Registers a new user to the poopinion database
 * 
 * @param {string} name user's name
 * @param {string} surname user's surname
 * @param {string} email user's unique e-mail
 * @param {string} password user's password
 * @param {number} age user's age
 * @param {string} gender user's gender
 * 
 * @returns {undefined} on a successful user registration
 * 
 * @throws {Error} if there is a server error or if the user already exists
 */

module.exports = (name, surname, email, password, age, gender) => {
    validate.stringFrontend(name, 'name')
    validate.stringFrontend(surname, 'surname')
    validate.stringFrontend(email, 'email')
    validate.email(email)
    validate.type(age, 'age', Number)
    validate.gender(gender, 'gender')
    validate.stringFrontend(password, 'password')

    return (async () => {
        const response = await fetch(`http://192.168.1.253:8085/api/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, email, password, age, gender })
        })
        const { status } = response

        if (status === 201) return

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 409) {
                throw new Error(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()
}