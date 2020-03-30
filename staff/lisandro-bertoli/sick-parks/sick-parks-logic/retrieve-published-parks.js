const fetch = require('node-fetch')
const { ContentError } = require('sick-parks-errors')
const context = require('./context')


/**
 * Retrieves the parks created by a specific user
 * 
 * @returns {Array} list of al parks data. Empty if user has no created parks
 * 
 * @throws {ContentError} if id in token is not valid
 */




module.exports = function () {

    return (async () => {
        const token = await this.storage.getItem('token')

        const response = await fetch(`${this.API_URL}/users/asdfasdf/parks`, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        })


        if (response.status === 200) {
            const { results } = await response.json()

            return results
        }

        if (response.status >= 400 || response.status < 500) {
            const data = await response.json()

            const { error } = data
            if (response.status === 406) throw new ContentError('invalid user id in token')

            throw new Error(error)


        } else throw new Error('Server error')

    })()

}.bind(context)