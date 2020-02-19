const write = require('./writeFile')

const d = new Date()
const dateNow = d.toString().split('GMT')[0].trim()

const logger = {
  WARN: function (route) {
    write(`404, route ${route} not found (${dateNow})`)
  },

  ERROR: function (message) {
    write(`500, something wrong: ${message} (${dateNow})`)
  },

  DEBUG: function (message) {
    write(`DEBUG: ${message} (${dateNow})`)
  }
}

module.exports = logger