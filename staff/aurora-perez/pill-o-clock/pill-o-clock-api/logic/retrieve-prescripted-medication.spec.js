require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrievePrescriptedMedication = require('./retrieve-prescripted-medication')
const { mongoose, models: { User, Drug, Guideline } } = require('pill-o-clock-data')


describe('retrievePrescriptedMedication', ()=> {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, gender, age, phone, profile, email, password, drugName, description, _id, time

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
        time = `${[random()]}`
    })

    describe ('when user alredy exists', ()=> {
        beforeEach(() => 
            Promise.all([User.create({ name, surname, gender, age, phone, profile, email, password }), Drug.create({drugName, description}) ])
                .then(([user, drug]) => {
                    userId = user.id
                    drugId= drug.id

                    const prescription = new Guideline({prescribed: userId, drug: drugId, times: time})
                    user.prescription.push(prescription)
                    return user.save()
                })
            .then(() => {})
        )
        it('should succeed on correct and valid date', ()=>
            Promise.all([retrievePrescriptedMedication(userId), User.findById(userId)])
                .then(([prescription, user ])=> { 
                    expect(prescription instanceof Array).to.equal(true)
                    expect(user.prescription).to.exist
                    expect(user.prescription[0]).to.exist
                    expect(user.prescription[0].drug.toString()).to.equal(drugId)
                    expect(user.prescription[0].prescribed.toString()).to.equal(userId)
                })
        )

        it('should fail if the user does not exist', () => {
            retrievePrescriptedMedication(`${userId}-wrong`)
                .then(()=> {throw new Error ('should not reach this point')})
                .catch(({message })=> {
                    expect(message).to.exist
                    
                    expect(message).to.equal(`user with id ${userId}-wrong not found`)
                    
                })
        })

    })


    it('should fail on a non-string id', () => {
        _id = 9328743289
        expect(() => retrievePrescriptedMedication(_id)).to.throw(TypeError, `id ${_id} is not a string`)
        _id = false
        expect(() => retrievePrescriptedMedication(_id)).to.throw(TypeError, `id ${_id} is not a string`)
        _id = undefined
        expect(() => retrievePrescriptedMedication(_id)).to.throw(TypeError, `id ${_id} is not a string`)
        _id = []
        expect(() => retrievePrescriptedMedication(_id)).to.throw(TypeError, `id ${_id} is not a string`)
    })
    after(() => Promise.all([User.deleteMany(), Drug.deleteMany(), Guideline.deleteMany()]).then(() => mongoose.disconnect()))
})