require('dotenv').config()
const { retrieveSubscribedEvents } = require('../logic')
const { database } = require('events-data')
const { env: { TEST_MONGODB_URL }} = process