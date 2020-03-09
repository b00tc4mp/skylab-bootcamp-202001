const {mongoose, Schema } = require('mongoose')

const UserSchema = new Schema({
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    username: {type: String, required: true, unique: true, trim: true},
    password: { type: String, required: true, trim: true },
    authenticated: { type: Date }
})

module.exports = mongoose.model('User', UserSchema)