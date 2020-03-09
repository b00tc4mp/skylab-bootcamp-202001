const mongoose = require('mongoose')
const { group } = require('../schemas')

module.exports = mongoose.model('Group', group)