const jwt = require('jsonwebtoken')

const getUserId = () => {
  const token = localStorage.getItem("token")

  console.log(token)
  if (typeof token !== "undefined") {

    const decoded = jwt.verify(token, "2019", (err, decoded) => {

      if (err) {
        localStorage.removeItem("token")
        return false
      }
      return decoded

    })

    return decoded.id
  }
  return false
}

module.exports = getUserId