if(typeof require !== 'undefined') {
    var users = require ('../utils/data')
}

authenticate = (username, password) => {
    if (typeof username !== 'string') throw new TypeError('username ' + username + ' is not a string')
    if (typeof password !== 'string') throw new TypeError('password ' + password + ' is not a string')

    let user = users.find(function (user) { return user.username === username; })

    if (!user || user.password !== password) throw new Error('Wrong credentials')
}

if(typeof module !== 'undefined') {
    module.exports =authenticate
}