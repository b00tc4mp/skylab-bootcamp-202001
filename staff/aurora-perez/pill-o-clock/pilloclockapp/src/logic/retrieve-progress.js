const { NotAllowedError, NotFoundError } = require('../errors') 
const { validate } = require('../utils')
const fetch = require('node-fetch') 
const context = require('./context')

module.exports = function () {

    return (async() => {
        const token = await this.storage.getItem('token')
   
        const response = await fetch(`${this.API_URL}/users/progress`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    
        const { status } = response
        
        if (status === 200) {
            const contacts = await response.json()
            
            return contacts
        }

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 404) {
                throw new NotFoundError(error)
            }


            throw new Error(error)
        }

        throw new Error('server error')
    })()
    
}.bind(context)