require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Drug, Guideline } } = require('pill-o-clock-data')
const { expect } = require('chai')
const { random } = Math
const addPrescription = require('./add-prescription')

describe('addPrescription', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Drug.deleteMany()]))
    )

    let name, surname, gender, age, phone, profile, email, password, drugName, description, _id, __id, time

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        gender = `gender-${random()}`
        age = random()
        phone = `00000-${random()}`
        profile = `profile-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        drugName = `drugName-${random()}`
        description = `description-${random()}`
        time = [`${random()}`]

    })

    describe('when user already exists', () => {

        beforeEach(() => 
            User.create({ name, surname, gender, age, phone, profile, email, password })
                .then(({ id }) => {
                    _id = id
                })
            .then(() => Drug.create({drugName, description}))
            .then(({id}) => _drugId = id)
        )

        it('should succeed on correct and valid and right data', () =>
            addPrescription(_id, _drugId, time)
                .then(() => User.findById(_id).lean() )
                .then((user) => {
                    expect(user).to.exist 
                    debugger
                    expect(user.prescription[0]).to.exist
                    expect(user.prescription[0].times[0]).to.equal(time[0])
                })
        )

        it('should fail if the drug does not exist', () => {
            _drugId = `${_drugId}-wrong`
            addPrescription(_id, _drugId, time)
                .then(()=> {throw new Error ('should not reach this point')})
                .catch(({message })=> {
                    expect(message).to.exist
                    
                    expect(message).to.equal(`drug with id ${_drugId} not found`)
                })
        })

    })

    describe('unhappy path syncronous', () => {
        beforeEach(() => 
            User.create({ name, surname, gender, age, phone, profile, email, password })
        .then(({id}) => {
            __id = id
        })
        )

        it('should fail on a non string id', async () => {
            let idWrong
            idWrong = 9328743289
            try {
                await addPrescription(idWrong, drugName, time)
            } catch (error) {
                _error = error
            } expect(_error.message).to.equal(`id ${idWrong} is not a string`)

            idWrong = false
            try {
                await addPrescription(idWrong, drugName, time)
            } catch (error) {
                _error = error
            } expect(_error.message).to.equal(`id ${idWrong} is not a string`)

            idWrong = undefined
            try {
                await addPrescription(idWrong, drugName, time)
            } catch (error) {
                _error = error
            } expect(_error.message).to.equal(`id ${idWrong} is not a string`)

            idWrong = []
            try {
                await addPrescription(idWrong, drugName, time)
            } catch (error) {
                _error = error
            } expect(_error.message).to.equal(`id ${idWrong} is not a string`)
        })

        it('should fail on a non string id', async () => {
            let drugName
            drugName = 9328743289
            try {
                await addPrescription(__id, drugName, time)
            } catch (error) {
                _error = error
            } expect(_error.message).to.equal(`drugId ${drugName} is not a string`)

            drugName = false
            try {
                await addPrescription(__id, drugName, time)
            } catch (error) {
                _error = error
            } expect(_error.message).to.equal(`drugId ${drugName} is not a string`)

            drugName = undefined
            try {
                await addPrescription(__id, drugName, time)
            } catch (error) {
                _error = error
            } expect(_error.message).to.equal(`drugId ${drugName} is not a string`)

            drugName = []
            try {
                await addPrescription(__id, drugName, time)
            } catch (error) {
                _error = error
            } expect(_error.message).to.equal(`drugId ${drugName} is not a string`)
        })


    })

after(() => Promise.all([User.deleteMany(), Drug.deleteMany(), Guideline.deleteMany()]).then(() => mongoose.disconnect()))
})
