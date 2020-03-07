require('dotenv').config()
const { env: { PORT } } = process
const app = require('express')()
const db = require('./config/db')
const api = require('./routes')

db()
  .then(() => {
    app.use(api)
    app.listen(PORT, () => console.log(`Api listening on port ${PORT}!`))
  })
  .catch(err => console.error('Something went wrong', err))