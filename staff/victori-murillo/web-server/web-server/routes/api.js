const express = require('express')
const router = express.Router()
const user = require('../handlers/user')

router.route(['/', '/register.html', "/register"])
  .post(user.registerUser)
  .get(user.renderRegister)

router.route(['/login', '/login.html'])
  .post(user.authUser)
  .get(user.renderLogin)

// router.get(["/", "/register.html"], user.renderRegister)
// router.get("/login.html", user.renderLogin)

// router.post('/authenticate', user.authUser)
// router.post('/register', user.registerUser)


module.exports = router