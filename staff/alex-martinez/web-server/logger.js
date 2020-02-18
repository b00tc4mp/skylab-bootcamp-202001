const fs = require('fs')
function log(level, message) {
    console.log(level, message)
    
    fs.writeFile('./server.log', `\n${level} ${message}`, {flag: "a"}, function(err) {
        if(err) {
            throw err
        }
    }); 
}
module.exports = {
    debug(message) { log('DEBUG', message) },
    info(message) { log('INFO', message) },
    warn(message) { log('WARN', message) },
    error(message) { log('ERROR', message) },
    fatal(message) { log('FATAL', message) }
}