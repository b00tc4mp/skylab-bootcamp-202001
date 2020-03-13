require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Session } } = require('events-data')
const { expect } = require('chai')
const { random } = Math
const saveSession= require('./save-session')

describe('save-session', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Session.deleteMany()]))
    )

    let name, surname, username, password, height, temperature, date, speed, time

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `email-${random()}@mail.com`
        password = `password-${random()}`
        height = `title-${random()}`
        temperature = `description-${random()}`
        date = new Date
        speed = `location-${random()}`
        time = `time-${random()}`
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(() =>
            User.create({ name, surname, username, password })
                .then(({ id }) => _id = id)
        )

        it('should succeed on correct and valid and right data', () =>
            saveSessiont(id, height, temperature, date, speed, time)
                .then(() =>
                    Promise.all([
                        User.findById(id),
                        Session.findOne({ height, temperature, date, speed, time })
                    ])
                )
                .then(([user, event]) => {
                    expect(user).to.exist
                    expect(user.sessions).to.contain(session.id)
                    expect(session).to.exist
                    expect(session.height).to.equal(height)
                    expect(session.temperature).to.equal(temperature)
                    expect(session.date).to.deep.equal(date)
                    expect(session.speed).to.equal(speed)
                    
                })
        )
    })

   

    after(() => Promise.all([User.deleteMany(), Session.deleteMany()]).then(() => mongoose.disconnect()))
})