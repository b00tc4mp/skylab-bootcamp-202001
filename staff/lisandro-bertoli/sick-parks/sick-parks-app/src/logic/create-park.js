require('dotenv').config()
const { validate } = require('../sick-parks-utils')
const { NotFoundError, NotAllowedError, ContentError } = require('../sick-parks-errors')
const API_URL = process.env.REACT_APP_API_URL

const fetch = require('node-fetch')

export default function CreatePark(token, data) {
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

    const [, payload] = token.split('.')


    return (async () => {
        const response = await fetch(`${API_URL}/users/${payload}/parks`, {
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
}