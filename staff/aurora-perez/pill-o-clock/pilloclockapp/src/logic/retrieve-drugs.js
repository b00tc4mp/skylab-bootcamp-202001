const { NotAllowedError, NotFoundError } = require( '../errors')
const { validate } = require('../utils')
const fetch = require('node-fetch') 
const context= require('./context')

module.exports = function () {
    return (async() => {
   
        const response = await fetch(`http://192.168.1.85:8085/api/drugs`)
    
        const { status } = response
        
        if (status === 200) {
            const drugs = await response.json()
            
            return drugs
        }

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
