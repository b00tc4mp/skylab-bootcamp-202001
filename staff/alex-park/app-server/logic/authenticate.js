'use strict';

if (typeof require !== 'undefined') {
    var users = require('../data')
}

function authenticate (username, password) {
    if (typeof username !== 'string') { throw new TypeError(username + " is not a string.") };
    if (typeof password !== 'string') { throw new TypeError(password + " is not a string.") };

    var user = users.find(function(user) { return user.username === username });

    if (!user || user.password !== password) { throw new Error('Wrong credentials') };
}

if (typeof module !== 'undefined') {
    module.exports = authenticate
}