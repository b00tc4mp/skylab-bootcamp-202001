require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveUser = require('./retrieve-user')
const { mongoose, models: { User } } = require('js-drone-data')

describe('retrieveUser', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, email, password, sessions, time, control, hightTempP, batteryP, heightP, speedP, atmosPressureP, date

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        password = `password-${random()}`
        control  = `control-${random()}`
        heightP = [`heightP-${random()}`, `heightP-${random()}`]
        speedP = [`speedP-${random()}`, `speedP-${random()}`]
        lowTempP=[`lowTempP-${random()}`, `lowTempP-${random()}`]
        hightTempP = [`hightTempP-${random()}`, `hightTempP-${random()}`]
        date = new Date
        batteryP = [`batteryp-${random()}`, `batteryp-${random()}`]
        atmosPressureP = [`atmosPressureP-${random()}`, `atmosPressureP-${random()}`]
        time = random()
        sessions = [{ time, control, lowTempP, hightTempP, batteryP, heightP, speedP, atmosPressureP, date }]
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(() =>
            User.create({ name, surname, username, password, sessions })
                .then(({ id }) => _id = id)
        )

        it('should succeed on correct and valid and right data', () =>
            retrieveUser(_id)
                .then(user => {
                    expect(user.constructor).to.equal(Object)
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.be.undefined
                    expect(user.sessions.time).to.equal(sessions.time)
                    expect(user.sessions.control).to.equal(sessions.control)
                    expect(user.sessions.lowTempP).to.equal(sessions.lowTempP)
                    expect(user.sessions.hightTempP).to.equal(sessions.hightTempP)
                    expect(user.sessions.batteryP).to.equal(sessions.batteryP)
                    expect(user.sessions.heightP).to.equal(sessions.heightP)
                    expect(user.sessions.speedP).to.equal(sessions.speedP)
                    expect(user.sessions.atmosPressureP).to.equal(sessions.atmosPressureP)
                    expect(user.sessions.date).to.equal(sessions.date)
                })
        )
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})