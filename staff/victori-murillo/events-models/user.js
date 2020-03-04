const { model, Schema } = require('mongoose')

module.exports = model('User', new Schema(
    {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            required: true,
            default: Date.now
        },
        authenticated: Date,
        retrieved: Date
    })
)

// function isMyFieldRequired () {
//     return typeof this.name === 'string' && this.name.trim() ? false : true
// }