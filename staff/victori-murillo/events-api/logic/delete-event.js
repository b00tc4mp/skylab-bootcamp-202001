const {database: db, database: {ObjectId}} = require('../data')
const {validate} = require('../utils')

module.exports = (userId, eventId) => {
  validate.string(userId, 'id')
  validate.string(eventId, 'id')

  const events = db.collection('events')
  const _id = ObjectId(eventId)

  return events.deleteOne({_id, publisher: 's'})
  .then(({deletedCount}) => {

    if (!deletedCount) throw new Error('The Event wasn\'t deleted')
  })

}