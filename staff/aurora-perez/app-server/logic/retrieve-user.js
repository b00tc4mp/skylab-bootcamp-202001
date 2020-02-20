if(typeof require !== 'undefined') {
    var users = require ('../utils/data')
}

retrieveUser = (username) => {
    if (typeof username !== 'string') throw new TypeError('username ' + username + ' is not a string')

    let user = users.find(function (user) { return user.username === username; })
}

if(typeof module !== 'undefined') {
    module.exports =retrieveUser
}