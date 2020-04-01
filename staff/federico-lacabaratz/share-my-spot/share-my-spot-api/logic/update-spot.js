const { validate } = require('share-my-spot-utils')
const { models: { Spot } } = require('share-my-spot-data')

/**
 * Updates the spot info
 * 
 * @param {string} userId user's unique id
 * @param {object} body the elements that will be updated
 * @param {string} spotId spot's unique id
 * 
 * @returns {Promise<string>} an empty Promise on a successful update
 * 
 */

module.exports = (userId, body, spotId) => {
    validate.string(userId, 'userId')
    validate.type(body, 'body', Object)
    validate.string(spotId, 'spotId')

    return Spot.findOneAndUpdate({ _id: spotId, publisherId: userId }, { $set: body, bookingCandidates: [], status: 'available'}, {$unset: {bookedTo: 1}})
        .then(() => { })
}