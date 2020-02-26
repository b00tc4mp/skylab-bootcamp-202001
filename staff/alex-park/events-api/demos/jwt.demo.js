const jwt = require('jsonwebtoken')

const SECRET = 'dont you dare go hollow'

const id = 'user-id-kdjf'

const token = jwt.sign({ sub: id }, SECRET, { expiresIn: '1h' })

let [, payload] = token.split('.')
payload = JSON.parse(atob(payload))

try {
    const payload = jwt.verify(token, SECRET)
} catch (error) {

}