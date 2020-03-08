require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Drug } } = require('pill-o-clock-data')
const { expect } = require('chai')
const { random } = Math
const addMedication = require('./add-medication')

describe('addMedication', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Drug.deleteMany()]))
    )

    let name, surname, gender, age, phone, profile, email, password, drugName, description

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

    })

    describe('when user already exists', () => {
        let _id
        debugger

        beforeEach(() => { 
            User.create({ name, surname, gender, age, phone, profile, email, password })
                .then(({ id }) => _id = id)
            Drug.create({drugName, description})
        })

        it('should succeed on correct and valid and right data', () =>
            addMedication(_id, drugName)
                .then(() => User.findById(_id) )
                .then((user) => {
                    expect(user).to.exist
                    expect(user.medication).to.contain(drugName)
                })
        )
        it('should fail if the drug does not exist', () => {
            drugName = `${drugName}-wrong`
            addMedication(_id, drugName)
                .then(()=> {throw new Error ('should not reach this point')})
                .catch(({message })=> {
                    expect(message).to.exist
                    
                    expect(message).to.equal(`drug with name ${drugName} not found`)
                    
                })
        })

    })

    // TODO more happies and unhappies

    after(() => Promise.all([User.deleteMany(), Drug.deleteMany()]).then(() => mongoose.disconnect()))
})