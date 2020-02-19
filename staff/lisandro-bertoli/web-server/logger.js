const fs = require('fs')
const moment = require('moment')

function log(level, message) {
    const output = `${level} ${moment().format('Y-MM-DD HH:mm:ss:SSS')} ${message}`

    const ws = fs.createWriteStream('./server.log', { flags: 'a', enconding: 'utf8' })

    ws.write(output + '\n')
    console.log(output)

    ws.on('error', error => {
        console.log(error)
    })
}
module.exports = {
    __debugActivated__: false,

    setDebugeActivated(enable) {
        this.__debugActivated__ = enable
    },

    debug(message) { this.__debugActivated__ && log('DEBUG', message) },
    info(message) { log('INFO', message) },
    warn(message) { log('WARN', message) },
    error(message) { log('ERROR', message) },
    fatal(message) { log('FATAL', message) }
}