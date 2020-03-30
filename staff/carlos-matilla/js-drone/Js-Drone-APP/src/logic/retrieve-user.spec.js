const { random } = Math
const { retrieveUser } = require('.')
const { mongoose, models: { User } } = require('./../../../Js-Drone-DATA')
const jwt = require('jsonwebtoken')
import context from './context'

const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
} } = process

describe('retrieveUser', () => {
    beforeAll(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, username, password, sessions, time, control, lowTempP, hightTempP, batteryP, heightP, speedP, atmosPressureP
    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        password = `password-${random()}`
        control  = `control-${random()}`,
        heightP =[`heightP-${random()}`, `heightP-${random()}`],
        speedP =[`speedP-${random()}`, `speedP-${random()}`],
        lowTempP=[`lowTempP-${random()}`, `lowTempP-${random()}`],
        hightTempP =[`hightTempP-${random()}`, `hightTempP-${random()}`],
        batteryP =[`batteryp-${random()}`, `batteryp-${random()}`],
        atmosPressureP =[`atmosPressureP-${random()}`, `atmosPressureP-${random()}`],
        time = random()
        sessions = [{time, control, lowTempP, hightTempP, batteryP, heightP, speedP, atmosPressureP}]

    })

    describe('when user already exists', () => {
        beforeEach(() =>
            User.create({ name, surname, username, password, sessions })
                .then(({ id }) => {
                    context.token = jwt.sign({ sub: id }, TEST_JWT_SECRET)
                    
                }
                ))

        it('should succeed on correct and valid and right data', () =>
            retrieveUser()
                .then(user => {
                    expect(user).toBeDefined()
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.username).toBe(username)
                    expect(user.password).toBeUndefined()
                    expect(user.sessions).toBeDefined()
                    expect(user.sessions[0].control).toBe(control)
                    expect(user.sessions[0].lowTempP.length).toBe(lowTempP.length)
                    expect(user.sessions[0].lowTempP[1]).toBe(lowTempP[1])
                    expect(user.sessions[0].lowTempP[0]).toBe(lowTempP[0])
                    expect(user.sessions[0].hightTempP.length).toBe(hightTempP.length)
                    expect(user.sessions[0].hightTempP[0]).toBe(hightTempP[0])
                    expect(user.sessions[0].hightTempP[1]).toBe(hightTempP[1])
                    expect(user.sessions[0].batteryP.length).toBe(batteryP.length)
                    expect(user.sessions[0].batteryP[0]).toBe(batteryP[0])
                    expect(user.sessions[0].batteryP[1]).toBe(batteryP[1])
                    expect(user.sessions[0].speedP.length).toBe(speedP.length)
                    expect(user.sessions[0].speedP[0]).toBe(speedP[0])
                    expect(user.sessions[0].speedP[1]).toBe(speedP[1])
                    expect(user.sessions[0].heightP.length).toBe(heightP.length)
                    expect(user.sessions[0].heightP[0]).toBe(heightP[0])
                    expect(user.sessions[0].heightP[1]).toBe(heightP[1])
                    expect(user.sessions[0].atmosPressureP.length).toBe(atmosPressureP.length)
                    expect(user.sessions[0].atmosPressureP[0]).toBe(atmosPressureP[0])
                    expect(user.sessions[0].atmosPressureP[1]).toBe(atmosPressureP[1])
        
                })
        )
    })

    // TODO more happies and unhappies

    afterAll(() => User.deleteMany().then(() => mongoose.disconnect()))
})

