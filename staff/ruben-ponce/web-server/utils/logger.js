const logger = {
    host: '',
    __write__(level, message){
        const fs = require('fs')
        fs.appendFile('server.log', `${level}: ${message}\n`, () => { })
    },
    debug(message){ this.__write__(`debug: form: ${this.host}`, message) },
    info(message){ this.__write__(`info: form: ${this.host}`, message) },
    warn(message){ this.__write__(`warn: form: ${this.host}`, message) },
    error(message){ this.__write__(`error: form: ${this.host}`, message) },
    fatal(message){ this.__write__(`fatal: form: ${this.host}`, message) }
}

module.exports = logger