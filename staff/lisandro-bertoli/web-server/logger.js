const fs = require('fs')
const moment = require('moment')

function log(level, message) {
    const output = `${level} ${moment().format('Y-MM-DD HH:mm:ss:SSS')} ${message}`

    fs.writeFile('./server.log', `${output}\n`, { flag: 'a', enconding: 'utf8' }, (error) => {
        if (error) console.log(error)

        console.log(output)
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