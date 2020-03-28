module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    rememberPassword: require('./remember-password'),
    retrieveUser: require('./retrieve-user'),
    updateUser: require('./update-user'),
    book: require('./book'),
    modifyBook: require('./modify-book'),
    cancelBook: require('./cancel-book'),
    retrieveUserBooks: require('./retrieve-user-books'),
    retrieveDayBooks: require('./retrieve-day-books'),
    quickSearch: require('./quick-search')
}