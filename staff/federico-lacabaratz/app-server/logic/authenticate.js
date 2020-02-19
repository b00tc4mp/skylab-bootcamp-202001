const users = require('../data.js')

const authenticate = (username, password) => {
    if (typeof username !== 'string') throw new TypeError('username ' + username + ' is not a string');
    if (typeof password !== 'string') throw new TypeError('password ' + password + ' is not a string');

    const user = users.find(function (user) { return user.username === username; });
    
    if (!user || user.password !== password) throw new Error('Wrong credentials ');
};

if (require !== undefined)
    module.exports = authenticate

