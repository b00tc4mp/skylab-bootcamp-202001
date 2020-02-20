const users = require('../data')

function retriveUser(_username) {
    const user = users.find(function (user) { return _username === user.username });
    const { name, surname, username } = user

    return { name, surname, username }
}

module.exports = retriveUser