require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Drug, Guideline } } = require('pill-o-clock-data')
const { expect } = require('chai')
const { random } = Math
const addPrescription = require('./add-Prescription')

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
        time = new Date

    })

    describe('when user already exists', () => {

        beforeEach(() => 
            User.create({ name, surname, gender, age, phone, profile, email, password })
                .then(({ id }) => {
                    _id = id
                })
            .then(() => Drug.create({drugName, description}))
            .then(() => {})
        )

        it('should succeed on correct and valid and right data', () =>
            addPrescription(_id, drugName, time)
                .then(() => User.findById(_id).populate('prescription').lean() )
                .then((user) => {
                    expect(user).to.exist 
                    expect(user.prescription[0]).to.exist
                    debugger
                    expect(Date(user.prescription[0].schedule[0].times[0])).to.equal(Date(time))
                })
        )

        it('should fail if the drug does not exist', () => {
            drugName = `${drugName}-wrong`
            addPrescription(_id, drugName, time)
                .then(()=> {throw new Error ('should not reach this point')})
                .catch(({message })=> {
                    expect(message).to.exist
                    
                    expect(message).to.equal(`drug with name ${drugName} not found`)
                    
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
        it('should fail on a non-string id', () => {
            let idWrong
            idWrong = 9328743289
            expect(() => addPrescription(idWrong, drugName, time)).to.throw(TypeError, `id ${idWrong} is not a string`)
            idWrong = false
            expect(() => addPrescription(idWrong, drugName, time)).to.throw(TypeError, `id ${idWrong} is not a string`)
            idWrong = undefined
            expect(() => addPrescription(idWrong, drugName, time)).to.throw(TypeError, `id ${idWrong} is not a string`)
            idWrong = []
            expect(() => addPrescription(idWrong, drugName, time)).to.throw(TypeError, `id ${idWrong} is not a string`)

        })

        it('should fail on a non-string drugName', () => {
            drugName = 9328743289
            expect(() => addPrescription(__id, drugName, time)).to.throw(TypeError, `drugName ${drugName} is not a string`)
            drugName = false
            expect(() => addPrescription(__id, drugName, time)).to.throw(TypeError, `drugName ${drugName} is not a string`)
            drugName = undefined
            expect(() => addPrescription(__id, drugName, time)).to.throw(TypeError, `drugName ${drugName} is not a string`)
            drugName = []
            expect(() => addPrescription(__id, drugName, time)).to.throw(TypeError, `drugName ${drugName} is not a string`)
        })
    })
        


after(() => Promise.all([User.deleteMany(), Drug.deleteMany(), Guideline.deleteMany()]).then(() => mongoose.disconnect()))
})