const { NotAllowedError, NotFoundError } = require( '../errors')
const { validate } = require('../utils')
const fetch = require('node-fetch') 
const context= require('./context')

module.exports = function () {
    return (async() => {
   
        const response = await fetch(`${this.API_URL}/drugs`)
    
        const { status } = response
        
        if (status === 200) {
            const drugs = await response.json()
            
            return drugs
        }

        if (status >= 400 && status < 500) {

            throw new Error(error)
        }

        throw new Error('server error')
    })()
    
}.bind(context)
