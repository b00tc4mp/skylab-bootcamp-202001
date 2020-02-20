const users = require('../data.js')

const retrieveUser = user => {
    if (typeof user !== 'string') throw new TypeError(`${user} is not a string`)

    const _user = users.find(element => {
        if(element.username === user) {return {name: element.name, surname: element.surname, username: element.username} }
    })

    return _user
}

    module.exports = retrieveUser
