const { validate } = require ('../utils')
const { NotAllowedError } = require('../errors')
const fetch = require ('node-fetch')
const context = require('./context')

module.exports = function (name, surname, gender, age, phone, profile, email, password){
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.gender(gender)
    validate.type(age, 'age', Number)
    validate.string(phone, 'phone')
    validate.string(profile, 'profile')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password') 
    
    return (async() => {

        const response = await fetch(`http://192.168.1.85:8085/api/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, gender, age, phone, profile, email, password })
        })

        const { status } = response

        if (status === 201) return

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 409) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')

    })()
   
}.bind(context)
