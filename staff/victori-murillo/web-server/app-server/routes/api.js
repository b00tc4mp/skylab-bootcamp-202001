const express = require('express')
const user = require('../handlers/user')

const router = express.Router()

router.post('/authenticate', user.authUser)
router.post('/register', user.registerUser)

router.get(["/", "/register.html"], user.renderRegister)
router.get("/login.html", user.renderLogin)

module.exports = router