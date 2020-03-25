const fetch = require('node-fetch')
const context = require('./context')

/**
 * Retrieves toilets sorted by the highest ranked
 * 
 * @returns {Array} array of toilets meeting the criteria. Empty array if no toilets are available
 * 
 */

module.exports = function () {
    return (async () => {
        const response = await fetch(`${this.API_URL}/top-toilets`)

        const { status } = response

        if (status === 200) {
            const toilets = await response.json()

            return toilets
        }

        return response.json()
    })()
}.bind(context)