module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    updateUser: require('./update-user'),
    createListing: require('./create-listing'),
    retrievePublishedListings: require('./retrieve-published-listings'),
    retrieveLastListings: require('./retrieve-last-listings'),
    updateListing: require('./update-listing'),
    deleteListing: require('./delete-listing'),
    saveListingPhoto: require('./save-listing-photo'),
    retrieveListingPhoto: require('./retrieve-listing-photo'),
    createBooking: require('./create-booking'),
    // acceptAndIncludeBooking: require('./accept-and-include-booking'),
    declineAndRemoveBooking: require('./decline-and-remove-booking')
}