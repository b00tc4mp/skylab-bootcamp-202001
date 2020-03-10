const mongoose = require('mongoose')
const { listing } = require('../schemas')

module.exports = mongoose.model('listing', listing)