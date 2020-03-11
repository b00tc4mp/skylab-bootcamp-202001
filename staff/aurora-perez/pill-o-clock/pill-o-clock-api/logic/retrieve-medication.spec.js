require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrievePrescriptedMedication = require('./retrieve-prescripted-medication')
const { mongoose, models: { User, Drug } } = require('pill-o-clock-data')


describe('retrievePrescriptedMedication', ()=> {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, gender, age, phone, profile, email, password, drugName, description, _id

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

    describe ('when user alredy exists', ()=> {
        beforeEach(() => 
            Promise.all([User.create({ name, surname, gender, age, phone, profile, email, password }), Drug.create({drugName, description}) ])
                .then(([user, drug]) => {
                    _id = user.id
                    user.medication.push(drug)
                    return user.save()
                })
                .then(() => {})
        )
        it('should succeed on correct and valid date', ()=>
            retrievePrescriptedMedication(_id) 
                .then(medication => { 
                    expect(medication instanceof Array).to.equal(true)
                    expect(medication[0].drugName).to.equal(drugName)
                    expect(medication[0].description).to.equal(description)
                })
        )

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
})