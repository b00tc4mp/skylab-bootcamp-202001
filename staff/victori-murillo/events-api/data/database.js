const {MongoClient, ObjectId} = require('mongodb')

let db, client

module.exports = {
  connect: (url) => 
    MongoClient.connect(url, { useUnifiedTopology: true })
    .then(_client => {
      client = _client
      db = client.db()
    }
  ),
  collection: (name) => db.collection(name),
  disconnect: () => client.close(),
  ObjectId
}