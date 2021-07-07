const jwt = require('jsonwebtoken')
require('dotenv').config()
const atob = require('atob')

const SECRET = '👌'

const id = 'user-id-kdjf'

const token = jwt.sign({ sub: id }, SECRET, { expiresIn: '1h' })

let [, payload] = token.split('.')
payload = JSON.parse(atob(payload))
console.log(payload)
