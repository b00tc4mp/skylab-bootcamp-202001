const { NotAllowedError, NotFoundError } = require( '../errors')
const { validate } = require('../utils')
const fetch = require('node-fetch') 
const context= require('./context')

module.exports = function (token, drugName, time) {
    validate.string(token, 'token')
    validate.string(drugName, 'drugName')
    validate.type(time, 'time', Array)

    return (async() => {
   
        const response = await fetch(`http://192.168.1.85:8085/api/users/add-prescription`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  
            },
            body: JSON.stringify({ drugName, time })
        })
    
        const { status } = response
        
        if (status === 201) return

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 401) {
                throw new NotAllowedError(error)
            }

            if (status === 404) {
                throw new NotFoundError(error)
            }


            throw new Error(error)
        }

        throw new Error('server error')
    })()
    
}.bind(context)