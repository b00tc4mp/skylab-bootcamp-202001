require('dotenv').config()
const { createEvent } = require('../logic')
const { database, models: { User, Event } } = require('../data')
const { env: { TEST_MONGODB_URL } } = process
const { random } = Math

database.connect(TEST_MONGODB_URL)
.then(() => {

    let id, name, surname, email, password, users, events, title, description, date, location
    events = database.collection('events')
    users = database.collection('users')
    name = `Monica`
    surname = `Park`
    email = `email-${random()}@mail.com`
    // password = `password-${random()}`
    // title = `RESACA`
    // description = `sobrevivamos juntos :(`
    // date = new Date
    // location = `skylab`
    title ='OSO'
    description = 'que esta pasando'
    date= new Date
    location= 'nowhere'
    
    return createEvent('5e5a6f6f6e23322660f0dcb5', title, description, location, date)
        .then(result => console.log(result))
})