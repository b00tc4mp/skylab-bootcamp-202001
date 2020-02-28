const { ObjectId } = require('../database')

module.exports = {
    title: String,
    description: String,
    date: Date,
    location: String,
    pusblisher: ObjectId
}