const { validate } = require('../utils')
const fetch = require('node-fetch')
const context = require('./context')

/**
 * Retrieves toilets that meet a certain query criteria
 * 
 * @param {string} query query to find the toilets
 * 
 * @returns {Array} array of toilets meeting the criteria. Empty array if no toilets met the criteria
 * 
 */

module.exports = function (query='') {
    validate.stringFrontend(query, 'query')

    return (async () => {
        const response = await fetch(`http://192.168.1.253:8085/api/toilets?q=${query}`)

        const { status } = response

        if (status === 200) {
            const toilets = await response.json()

            return toilets
        }

        throw new Error('server error')
    })()
}.bind(context)