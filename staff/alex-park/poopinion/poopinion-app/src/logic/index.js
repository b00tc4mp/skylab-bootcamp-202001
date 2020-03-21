const context = require('./context')

module.exports = {
    get __context__() { return context },
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    publishToilet: require('./publish-toilet'),
    searchToilets: require('./search-toilets'),
    toggleFavToilet: require('./toggle-fav-toilet'),
    retrieveFavToilets: require('./retrieve-fav-toilets'),
    retrieveToilet: require('./retrieve-toilet'),
    toggleThumbUp: require('./toggle-thumb-up'),
    toggleThumbDown: require('./toggle-thumb-down'),
    publishComment: require('./publish-comment')
}