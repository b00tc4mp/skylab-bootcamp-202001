const mongoose = require('mongoose')
const { session } = require('../schemas')

module.exports = mongoose.model('Session', session)