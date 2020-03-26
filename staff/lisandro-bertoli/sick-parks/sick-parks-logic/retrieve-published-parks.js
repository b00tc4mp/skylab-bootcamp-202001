const fetch = require('node-fetch')
const { ContentError, NotFoundError, NotAllowedError } = require('sick-parks-errors')
const context = require('./context')



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
            if (response.status === 406) throw new ContentError(error)

            throw new Error(error)


        } else throw new Error('Server error')

    })()

}.bind(context)