const { mongoose, models: { User } } = require('sick-parks-data');

(async () => {
    await mongoose.connect('mongodb://localhost/test', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useCreateIndex: true // JUST necessary in case of index creation through mongoose (to avoid ensureIndex)
    })

    // await mongoose.connection.db.dropDatabase()
    await User.deleteMany()

    await User.create({ name: 'name', email: 'name@mail.com', surname: 'surname', password: '123' })

    debugger
})()
    .catch(console.error)
    .finally(mongoose.disconnect)