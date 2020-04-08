const context = require('./context')
const { validate } = require('sick-parks-utils')

module.exports = function (isAnonymous = true) {
    validate.type(true, 'isAnonymous', Boolean)

    return (async () => {
        if (isAnonymous)
            await this.storage.setItem('role', 'anonymous')
        else
            await this.storage.removeItem('role')
    })()
}.bind(context)