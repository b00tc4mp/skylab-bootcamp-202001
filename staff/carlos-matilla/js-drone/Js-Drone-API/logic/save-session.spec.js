require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Sessions } } = require('js-drone-data')
const { expect } = require('chai')
const { random } = Math
const saveSession= require('./save-session')

describe('save-session', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    
    let name, surname, username, password, time, control, hightTempP, batteryP, heightP, speedP, atmosPressureP, date

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `${random()}`
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
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(() =>
            User.create({ name, surname, username, password })
                .then(({ id }) => _id = id)
        )

        it('should succeed on correct and valid and right data', () =>
            saveSession(_id, time, control, lowTempP, hightTempP, batteryP, heightP, speedP, atmosPressureP, date)
                .then(() => User.findById(_id))
                .then(user => {
                    expect(user).to.exist
                    expect(user.sessions[0].control).to.equal(control)
                    expect(user.sessions[0].lowTempP.length).to.equal(lowTempP.length)
                    expect(user.sessions[0].lowTempP[1]).to.equal(lowTempP[1])
                    expect(user.sessions[0].lowTempP[0]).to.equal(lowTempP[0])
                    expect(user.sessions[0].hightTempP.length).to.equal(hightTempP.length)
                    expect(user.sessions[0].hightTempP[0]).to.equal(hightTempP[0])
                    expect(user.sessions[0].hightTempP[1]).to.equal(hightTempP[1])
                    expect(user.sessions[0].batteryP.length).to.equal(batteryP.length)
                    expect(user.sessions[0].batteryP[0]).to.equal(batteryP[0])
                    expect(user.sessions[0].batteryP[1]).to.equal(batteryP[1])
                    expect(user.sessions[0].speedP.length).to.equal(speedP.length)
                    expect(user.sessions[0].speedP[0]).to.equal(speedP[0])
                    expect(user.sessions[0].speedP[1]).to.equal(speedP[1])
                    expect(user.sessions[0].heightP.length).to.equal(heightP.length)
                    expect(user.sessions[0].heightP[0]).to.equal(heightP[0])
                    expect(user.sessions[0].heightP[1]).to.equal(heightP[1])
                    expect(user.sessions[0].atmosPressureP.length).to.equal(atmosPressureP.length)
                    expect(user.sessions[0].atmosPressureP[0]).to.equal(atmosPressureP[0])
                    expect(user.sessions[0].atmosPressureP[1]).to.equal(atmosPressureP[1])
                    expect(user.sessions[0].date[0]).to.equal(date[0])
                    expect(user.sessions[0].id).to.exist
                })
        )
    })

   

    after(() => (User.deleteMany()).then(() => mongoose.disconnect()))
})