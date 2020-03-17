module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    updateUser: require('./update-user'),
    createSpot: require('./create-spot'),
    retrievePublishedSpots: require('./retrieve-published-spots'),
    retrieveLastSpots: require('./retrieve-last-spots'),
    updateSpot: require('./update-spot'),
    deleteSpot: require('./delete-spot'),
    saveSpotPhoto: require('./save-spot-photo'),
    retrieveSpotPhoto: require('./retrieve-spot-photo'),
    bookSpot: require('./book-spot'),
    acceptBooking: require('./accept-abooking'),
    declineBooking: require('./decline-booking')
}