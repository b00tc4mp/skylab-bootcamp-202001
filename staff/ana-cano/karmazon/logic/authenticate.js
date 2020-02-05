'use strict';

function authenticateUser(username, password, callback) {
    if (typeof username !== 'string') throw new TypeError('username ' + username + ' is not a string');
    if (typeof password !== 'string') throw new TypeError('password ' + password + ' is not a string');



    call("https://skylabcoders.herokuapp.com/api/v2/users/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        },

        response => {
            const { error, token } = JSON.parse(response.content)
            if (response.status === 401) { callback(new Error(error)) }

            callback(token)
        }
    )
}