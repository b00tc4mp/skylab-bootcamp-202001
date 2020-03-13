module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    updateUser: require('./update-user'),
    createListing: require('./create-listing'),
    retrievePublishedListings: require('./retrieve-published-listings'),
    retrieveLastListings: require('./retrieve-last-listings'),
    updateListing: require('./update-listing'),
    deleteListing: require('./delete-listing')
    // subscribeListing: require('./subscribe-listing'),
    // retrieveSubscribedListings: require('./retrieve-subscribed-listings'),
    // deleteListing: require('./delete-booking')
}