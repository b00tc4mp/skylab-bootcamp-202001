require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Drug } } = require('pill-o-clock-data')
const { expect } = require('chai')
const { random } = Math
const deleteMedication = require('./delete-medication')
const { NotFoundError } = require('pill-o-clock-errors')

describe('deleteMedication', () => {
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

    })

    describe('when user already exists', () => {

        beforeEach(() => 
            Promise.all([User.create({ name, surname, gender, age, phone, profile, email, password }), Drug.create({drugName, description}) ])
                .then(([user, drug]) => {
                    _id = user.id
                    user.medication.push(drug)
                    return user.save()
                })
            .then(() => {})
        )
        
        it('should fail if the drug does not exist', () => {
            drugName = `${drugName}-wrong`
            deleteMedication(_id, drugName)
                .then(()=> {throw new Error ('should not reach this point')})
                .catch(({message })=> {
                    expect(message).to.exist
                    
                    expect(message).to.equal(`drug with name ${drugName} not found`)
                    
                })
        })

        it('should fail to delete if the user does not exist', () => {
            deleteMedication(`${_id}-wrong`, drugName)
            .then(() => { throw new Error ('should not reach this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceof(NotFoundError)
                expect(error.message).to.equal(`user with id ${_id}-wrong does not exist`)
            })
        })

        it('should succeed on correct and valid and right data', () =>
            User.findById(_id).lean()
                .then((user) => {
                    expect(user.medication).to.exist
                    expect(user.medication[0]).to.exist
                })

            .then( () => deleteMedication(_id, drugName)
                .then(() => User.findById(_id).lean() )
                .then((user) => {
                    expect(user).to.exist
                    expect(user.medication[0]).to.be.undefined
                })
            )
        )


    })

    describe('unhuppy path syncronous', () => {
        beforeEach(() => 
            User.create({ name, surname, gender, age, phone, profile, email, password })
        .then(({id}) => {
            __id = id
        })
        )
        it('should fail on a non-string id', () => {
            let idWrong

            idWrong = 9328743289
            expect(() => deleteMedication(idWrong, drugName)).to.throw(TypeError, `id ${idWrong} is not a string`)
            
            idWrong = false
            expect(() => deleteMedication(idWrong, drugName)).to.throw(TypeError, `id ${idWrong} is not a string`)
            
            idWrong = undefined
            expect(() => deleteMedication(idWrong, drugName)).to.throw(TypeError, `id ${idWrong} is not a string`)
            
            idWrong = []
            expect(() => deleteMedication(idWrong, drugName)).to.throw(TypeError, `id ${idWrong} is not a string`)

        })

        it('should fail on a non-string drugName', () => {
            drugName = 9328743289
            expect(() => deleteMedication(__id, drugName)).to.throw(TypeError, `drugName ${drugName} is not a string`)
            
            drugName = false
            expect(() => deleteMedication(__id, drugName)).to.throw(TypeError, `drugName ${drugName} is not a string`)
            
            drugName = undefined
            expect(() => deleteMedication(__id, drugName)).to.throw(TypeError, `drugName ${drugName} is not a string`)
            
            drugName = []
            expect(() => deleteMedication(__id, drugName)).to.throw(TypeError, `drugName ${drugName} is not a string`)
        })
    })


    after(() => Promise.all([User.deleteMany(), Drug.deleteMany()]).then(() => mongoose.disconnect()))
})