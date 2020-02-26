function editProfile(name, surname, username, password, id) {
    if (typeof name !== 'string') throw new TypeError('name ' + name + ' is not a string');
    if (typeof surname !== 'string') throw new TypeError('surname ' + surname + ' is not a string');
    if (typeof username !== 'string') throw new TypeError('username ' + username + ' is not a string');
    if (typeof password !== 'string') throw new TypeError('password ' + password + ' is not a string');


    users = users.map(function (user) {
        if (user.id === id) {
            return {name, surname, username, password, id}
        } else {
            return user
        }
    })

}