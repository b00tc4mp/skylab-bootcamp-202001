const { database } = require('../data')

module.exports = () => database.collection('events')
  .find()
  .sort({created: -1})
  .toArray()


  // Getting data as streaming -->
// module.exports = () => {

//   const events = database.collection('events')
//   const allEvents = [];

//   const cursor = events.find()

//   return (function print() {
//     return cursor
//       .hasNext()
//       .then(hasNext => hasNext && cursor.next())
//       .then(result => result && allEvents.push(result) && print())
//       .then(() => allEvents)

//   })();


// }

