const context = require('./context')

module.exports = function () {
    return this.storage.removeItem('id')
}.bind(context)