require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Drug, Guideline } } = require('pill-o-clock-data')
const { expect } = require('chai')
const { random } = Math
const deletePrescription = require('./delete-prescription')


describe('deletePrescritpion', ()=> {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Drug.deleteMany()]))
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
        time = `times-${random()}`

    })

    describe('when user alredy exists', ()=> {

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

        it('should succeed on correct and valid and right data', () =>
            User.findById(userId).lean()
                .then(user => {
                    expect(user.prescription).to.exist
                    expect(user.prescription[0]).to.exist
                    expect(user.prescription[0].drug.toString()).to.equal(drugId)
                    expect(user.prescription[0].prescribed.toString()).to.equal(userId)
                })

            .then( () => deletePrescription(userId, drugId)
                .then(() => User.findById(userId).lean() )
                .then((user) => {
                    expect(user).to.exist
                    expect(user.prescription[0]).to.be.undefined
                })
            )
        )
        
        it('should fail if the drug does not exist', () => {
            drugName = `${drugName}-wrong`
            deletePrescription(userId, drugId)
                .then(()=> {throw new Error ('should not reach this point')})
                .catch(({message })=> {
                    expect(message).to.exist
                    
                    expect(message).to.equal(`drug with name ${drugName} not found`)
                    
                })
        })

    })
})