// const { validate } = require('../utils')
// const { database, database: { ObjectId } } = require('../data')

// module.exports = userId => {
//     validate.string(userId, 'user ID')

//     const events = database.collection('events')

//     return events.find({ subscribers: ObjectId(userId) }).toArray()
// }