const { MongoClient } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true })
    .then(client => {
        const db = client.db('event')

        const users = db.collection('users')

        users.insertOne({ name: 'lala', surname: 'Lolo', email: 'jaadlo@grillo.com', password: 'ppp' })
            .then(() => { const cursor = users.find(); return cursor })
            .then(cursor => cursor.toArray())
            .then(users => users.forEach(user => console.log(user)))

        // users.updateOne(
        //     { name: "lala" },
        //     { $set: { password: "111", email: "pepigri@gri.com" } }
        // )
        //     .then(() => users.deleteOne({ password: 'ppp' }))
        //     .then(() => console.log('LAST ACTION:\n deleted'))
        //     .catch(error => console.log('error', error))

        db.createCollection('events')
            .then(collection => {
                collection.insertOne({ location: 'outer-space', date: 'when possible' })
            })
            .then(value => { })
    })