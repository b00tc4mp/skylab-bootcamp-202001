const context = require('./context')


/**
 * Removes the user's token from the context's storage
 * 
 * @returns {undefined} 
 * 
 */


module.exports = function () {
    return this.storage.removeItem('token')
}.bind(context)