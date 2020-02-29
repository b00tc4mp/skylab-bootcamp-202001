const { ObjectId } = require('../database')

module.exports = {
    name: String,
    surname: String,
    email: String,
    password: String,
    // publishedEvents: Array,
    // suscribedEvents: [ObjectId]
}