const fs = require('fs')
const moment = require('moment')

function log(level, message) {
    const output = `${level} ${moment().format('Y-MM-DD HH:mm:ss.SSS')} ${message}`

    console.log(output)

    fs.writeFile('./server.log', `${output}\n`, { encoding: 'utf8', flag: 'a' }, error => {
        if (error) console.error(error)
    })
}

module.exports = {
    __debugEnabled__: false,

    setDebugEnabled(enable) {
        this.__debugEnabled__ = enable
    },

    debug(message) { this.__debugEnabled__ && log('DEBUG', message) },

    info(message) { log('INFO', message) },

    warn(message) { log('WARN', message) },

    error(message) { log('ERROR', message) },

    fatal(message) { log('FATAL', message) }
}
// const fs = require('fs')

// const logger = {
//     debug: (data) => {

//         fs.appendFile('server.log', `DEBUG: ${data.toString()}\n`, 'utf8', error => {
//             if (error) throw error
//         })
//     },
//     error: (data) => {

//         fs.appendFile('server.log', `ERROR: ${data.toString()}\n`, 'utf8', error => {
//             if (error) throw error
//         })
//     },
//     info: (data) => {

//         fs.appendFile('server.log', `INFO: ${data.toString()}\n`, 'utf8', error => {
//             if (error) throw error
//         })
//     },
//     warning: (data) => {

//         fs.appendFile('server.log', `WARNING: ${data.toString()}\n`, 'utf8', error => {
//             if (error) throw error
//         })
//     }
// }

// module.exports = logger



// const logger = {
//     _host: '',
//     set host(host) { this._host = host },
//     get host() { return this._host },
//     __dateTime__() {
//         const d = new Date()
//         return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
//     },
//     __write__(message, callback = () => { }) {
//         const fs = require('fs')
//         fs.appendFile('server.log', `${this.__dateTime__()} ${this.host} ${message}\n`, (error) => {
//             if (error) {
//                 return callback(error.message)
//             }
//             callback('OK')
//         })
//     },
//     debug(message, callback) { this.__write__(`DEBUG ${message}`, callback) },
//     info(message, callback) { this.__write__(`INFO ${message}`, callback) },
//     error(message, callback) { this.__write__(`ERROR ${message}`, callback) },
//     warn(message, callback) { this.__write__(`WARN ${message}`, callback) },
//     fatal(message, callback) { this.__write__(`FATAL ${message}`, callback) }
// }
// if (typeof module !== 'undefined') {
//     module.exports = logger
// }