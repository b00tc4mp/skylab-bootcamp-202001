const { NotAllowedError, NotFoundError } = require( '../errors')
const { validate } = require('../utils')
const fetch = require('node-fetch') 
const context= require('./context')

module.exports = function (idDrug) {
    validate.string(idDrug, 'idDrug')

    return (async() => {
        const token = await this.storage.getItem('token')
   
        const response = await fetch(`${this.API_URL}/api/users/prescription/${idDrug}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  
            },
        })
    
        const { status } = response
        
        if (status === 200) return

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