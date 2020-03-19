import { validate } from '../utils'
import fetch from 'node-fetch'
import { NotAllowedError, NotFoundError } from '../errors'
import * as FileSystem from 'expo-file-system'

/**
 * Publishes a new toilet post
 * 
 * @param {string} place the place's name of the toilet
 * @param {Object} coordinates google maps coordinates
 * 
 * @returns {string} user's unique token
 * 
 * @throws {NotAllowedError} on wrong credentials or deactivated user
 * @throws {NotFoundError} on non-existent user
 */

function publishToilet(token, place='(No place defined)', image, coordinates) {
    validate.string(token, 'token')
    validate.string(place, 'place')
    validate.type(coordinates, 'coordinates', Object)

    return (async () => {
        const response = await fetch('http://192.168.1.253:8085/api/users/toilet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ place, coordinates })
        })

        const { status } = response

        if (status === 201) {
            const userResponse = await fetch(`http://192.168.1.253:8085/api/users`, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            })

            const user = await userResponse.json()

            const toilet = user.publishedToilets.find(toilet => toilet.place === place)

            if (image !== null) {
                let form = new FormData()
                form.append('image', {
                    uri: image,
                    type: 'image/jpeg',
                    name: 'toilet01',
                })

                const imageResponse = await fetch(`http://192.168.1.253:8085/api/upload/${toilet.id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
                    body: form
                })

                const { status } = imageResponse

                if (status === 200) {
                    const image = { image: `http://192.168.1.253:8085/api/load/${toilet.id}` }

                    const updateImage = await fetch(`http://192.168.1.253:8085/api/users/toilet/${toilet.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                        body: JSON.stringify(image)
                    })

                    const { status } = updateImage

                    if (status === 200) return
                }

                if (status >= 400 && status < 500) {
                    const { error } = await imageResponse.json()

                    if (status === 409) {
                        throw new NotAllowedError(error)
                    }

                    if (status === 404) {
                        throw new NotFoundError(error)
                    }

                    throw new Error(error)
                }
            } else return
        }

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 409) {
                throw new NotAllowedError(error)
            }

            if (status === 404) {
                throw new NotFoundError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()
}

export default publishToilet