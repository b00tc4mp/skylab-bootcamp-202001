const { validate } = require('../sick-parks-utils')
const { NotFoundError, NotAllowedError, ContentError } = require('sick-parks-errors')
const context = require('./context')
var Base64 = require('js-base64').Base64

const fetch = require('node-fetch')

module.exports = function (data) {
    const { features, park } = data

    for (key in park) {
        if (key !== 'location') validate.string(park[key], key)
        else validate.type(park[key], key, Object)
    }

    if (features) {
        validate.type(features, 'features', Array)
        features.forEach(feature => {
            for (key in feature)
                if (key !== 'location') validate.string(feature[key], key)
                else validate.type(feature[key], key, Object)
        })
    }

    return (async () => {
        const token = await this.storage.getItem('token')

        const [, payload] = token.split('.')

        const { sub } = Base64.decode(payload)
        debugger

        const response = await fetch(`http://192.168.1.101:8085/api/users/${sub}/parks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ park, features })
        })

        if (response.status === 201) return

        if (response.status >= 400 || response.status < 500) {
            return response.json()
                .then(response => {
                    const { error } = response
                    if (response.status === 404) throw new NotFoundError(error)
                    if (response.status === 403) throw new NotAllowedError(error)

                    throw new Error(error)

                })
        } else throw new Error('Server error')
    })()
}.bind(context)