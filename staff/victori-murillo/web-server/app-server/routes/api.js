const express = require('express')
const router = express.Router()
const user = require('../handlers/user')

router.post('/authenticate', user.authUser)
router.post('/register', user.registerUser)

router.get(["/", "/register.html"], user.renderRegister)
router.get("/login.html", user.renderLogin)

module.exports = router