const context = require('./context')
const fetch = require('node-fetch')
const { NotFoundError } = require('sick-parks-errors')

module.exports = function retrieveUser() {
    //TODO add userId as arg fro retrieveing user other than the current user
    return (async () => {

        const token = await this.storage.getItem('token')

        const response = await fetch(`${this.API_URL}/users`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })

        const data = await response.json()
        const { error: _error } = data

        if (_error) throw new NotFoundError('This user does not exist anymore')

        const { id, name, surname, email, contributions, image, allowLocation, notifications } = data

        return { id, name, surname, email, contributions, image, allowLocation, notifications }

    })()
}.bind(context)