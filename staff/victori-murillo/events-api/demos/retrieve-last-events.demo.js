require('dotenv').config()

const { retrieveLastEvents } = require('../logic')
const { Event, User } = require('../models')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/events', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => retrieveLastEvents())
  .then(() => console.log('aaa'))
  .then(() => mongoose.disconnect())
  .catch(error => console.log(error))
