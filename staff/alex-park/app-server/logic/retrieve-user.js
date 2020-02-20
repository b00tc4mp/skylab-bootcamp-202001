const users = require('../data/users')

module.exports = username => {
    if (typeof username !== 'string') { throw new TypeError(username + " is not a string.") };

    let user = (users.find(function(user) { return user.username === username }))

    return user
}