const { validate } = require('sick-parks-utils')
const { NotFoundError, NotAllowedError, ContentError } = require('sick-parks-errors')
const context = require('./context')
const fetch = require('node-fetch')

module.exports = function (data) {
    const { features, park } = data
    if (park.flow) validate.stringFrontend(park.flow, 'flow')

    for (key in park) {
        if (key === 'location') validate.type(park[key], key, Object)
        else if (key !== 'flow') validate.stringFrontend(park[key], key)
    }

    if (features.length) {
        validate.type(features, 'features', Array)
        features.forEach(feature => {
            for (key in feature)
                if (key !== 'location') validate.stringFrontend(feature[key], key, false)
                else validate.type(feature[key], key, Object)
        })
    }

    return (async () => {
        const token = await this.storage.getItem('token')

        const response = await fetch(`${this.API_URL}/users/parks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ park, features })
        })

        if (response.status === 201) return

        if (response.status >= 400 || response.status < 500) {
            return response.json()
                .then(response => {
                    const { error } = response
                    if (response.status === 404) throw new NotFoundError('It seems you are not logged in or you deleted your account')
                    if (response.status === 403) throw new NotAllowedError(error)

                    throw new Error(error)

                })
        } else throw new Error('Server error')
    })()
}.bind(context)