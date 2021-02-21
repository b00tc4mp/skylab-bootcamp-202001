const fs = require('fs')
const moment = require('moment')

const logger = {
    __location__: {},
    set location(location) { this.__location__ = location || '' },
    get location() { return this.__location__ },

    __port__: '',
    set port(port) { this.__port__ = port },
    get port() { return this.__port__ },

    __ip__: '',
    set ip(ip) { this.__ip__ = ip || 'localhost' },
    get ip() { return this.__ip__ },

    log(level, message) {
        const {ip, port} = this
        const host = ip && port? ip + ":" + port : ""

        const output = `${level}\t${moment().format('Y-MM-DD HH:mm:ss')}\t ${this.location.city} ${host}\t${message}\n`
    
        fs.writeFile('server.log', output, { enconding: 'utf8', flag: 'a' }, error => {
            if (error) console.log(error)
        })
    },

    __debugEnabled__: false,
    setDebugEnabled(enable) {
        this.__debugEnabled__ = enable
    },

    debug(message) { this.__debugEnabled__ && this.log('DEBUG', message) },
    info(message) { this.log('INFO', message) },
    warn(message) { this.log('WARN', message) },
    error(message) { this.log('ERROR', message) },
    fatal(message) { this.log('FATAL', message) }
}

module.exports = logger