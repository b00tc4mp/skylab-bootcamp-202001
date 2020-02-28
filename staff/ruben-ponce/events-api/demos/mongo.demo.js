const { MongoClient } = require('mongodb')

const client = new MongoClient('mongodb://localhost:27017', {useUnifiedTopology: true })

client.connect()
    .then(() => {
        const db = client.db('events')

        const users = db.collection('users')

    //WRITE
        //Create one
        // users.insertOne({name: 'iep', surname: 'iep', email: 'iep@mail.com', password: 'iep'})
        //     .then(result => {
        //         console.log(result)
        //     })
        //Create 100 more
        // (function insert(count) {
        //     count < 100 &&
        //     users.insertOne({name: 'iep-' + count, surname: 'iep', email: 'iep@mail.com', password: 'iep'})
        //         .then(() => insert(++count))
        //         || console.log('end')
        // })(0)
        
        //Other way

        //  const _users = []
        //  let count = 100
        //  while (count--) _users.push({ name: 'Menga-' + count, surname: 'Nota', email: 'menganita@gmail.com', password: '123' })
        //  users.insertMany(_users)
        //      .then(() => console.log('ended'))

    //READ
        const cursor = users.find()

        cursor.toArray()
            .then(users => users.forEach(user => console.log(user)))


    //UPDATE
                //db.producto.updateOne({"id":"1"},{ $set: {"name":"value"}})
        //users.updateOne({"name": 'iep' },{ $set: {"name":"hei maailma"}})

    //Multi update in all documents
                //db.producto.updateMany({"id":"1"},{ $set: {"name":"value"}, {multi:true}})
        //users.updateOne({"name": 'iep' },{ $set: {"name":"hei maailma"}})


    //DELETE
                    // db.producto.deleteOne({"_id":"1"})  
        // users.deleteOne({"surname":"Nota"})
        // users.deleteMany({"surname":"Nota"})
        //     .then(() => console.log('deleted all'))
    })