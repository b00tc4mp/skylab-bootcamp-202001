/** @function authenticateUser
 * @param {string} username - Username of user
 * @param {string} password - Password of user
 * @param {function} callback - Return error / user and token
 * @throw - Will throw an error if username is empty
 * @throw - Will throw an error if username is not a string
 * @throw - Will throw an error if password is empty
 * @throw - Will throw an error if password is not a string
 * @throw - Will throw an error if callback is not a function
 */

function authenticateUser(username, password, callback) {
  if (!username.trim()) throw new Error("username is empty")
  if (!password.trim()) throw new Error("password is empty")
  if (typeof username !== "string")
    throw new TypeError("username " + username + " is not a string")
  if (typeof password !== "string")
    throw new TypeError("password " + password + " is not a string")
  if (typeof callback !== "function")
    throw new TypeError(`${callback} is not a function`)

  call(
    "https://skylabcoders.herokuapp.com/api/v2/users/auth",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    },
    (error, response) => {
      if (error) return callback(error)

      const { error: _error, token } = JSON.parse(response.content)

      if (_error) return callback(new Error(_error))

      call(
        `https://skylabcoders.herokuapp.com/api/v2/users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        },
        (error, response) => {
          if (error) return callback(error)

          const user = JSON.parse(response.content),
            { error: _error } = user

          if (_error) return callback(new Error(_error))

          if (user.mtg) callback(undefined, token, user)
        }
      )
    }
  )
}
