module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    updateUser: require('./update-user'),
    publishListing: require('./publish-listing'),
    retrievePublishedListings: require('./retrieve-published-listings'),
    retrieveLastListings: require('./retrieve-last-listings'),
    subscribeListing: require('./subscribe-listing'),
    retrieveSubscribedListings: require('./retrieve-subscribed-listings'),
    updateListing: require('./update-listing'),
    unsubscribeListing: require('./delete-booking')
}