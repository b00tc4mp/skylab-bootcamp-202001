require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('pill-o-clock-data')
const { expect } = require('chai')
const { random } = Math
const addContact = require('./add-contact')

describe('addContact', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, gender, age, phone, profile, email, password, name2, surname2, gender2, age2, phone2, profile2, email2, password2, idUser, idUserToAdd

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        gender = `gender-${random()}`
        age = random()
        phone = `00000-${random()}`
        profile = `profile-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`

        name2 = `name-${random()}`
        surname2 = `surname-${random()}`
        gender2 = `gender-${random()}`
        age2 = random()
        phone2 = `00000-${random()}`
        profile2 = `profile-${random()}`
        email2 = `email--${random()}@mail.com`
        password2 = `password-${random()}`
    })

    describe('when user already exists', () => {

        beforeEach(() => 
            Promise.all([User.create({ name, surname, gender, age, phone, profile, email, password }),
                User.create({ name: name2, surname: surname2, gender: gender2, age: age2, phone: phone2, profile: profile2, email: email2, password: password2 })])
                
                .then(([user, userToAdd]) => {
                    idUser = user.id
                    idUserToAdd = userToAdd.id

                })
        )

        it('should succeed on correct and valid and right data', () => {
            
            addContact(idUser, idUserToAdd)
                .then(Promise.all([User.findById(idUser).lean(), User.findById(idSecondUser).lean()]) )
                .then(([user, user2]) => {
                    expect(user).to.exist
                    expect(user.contact).to.include(idUserToAdd)
                    expect(user2.contacts).to.include(idUser)
                })
        })


    })
    describe('when user does not exist', ()=>{

        it('should fail if user does not exist', () => {
            addContact(idUser, idUserToAdd)
                .then(()=> {throw new Error ('should not reach this point')})
                .catch(({message })=> {
                    expect(message).to.exist
                    
                    expect(message).to.equal(`user with id ${idUser} not found`)
                    
                })
        })
    })

    describe('unhappy path syncronous', () => {
        
        it('should fail on a non-string idUser', () => {
            let idWrong
            idWrong = 9328743289
            expect(() => addContact(idWrong, idUserToAdd)).to.throw(TypeError, `idUser ${idWrong} is not a string`)
            idWrong = false
            expect(() => addContact(idWrong, idUserToAdd)).to.throw(TypeError, `idUser ${idWrong} is not a string`)
            idWrong = undefined
            expect(() => addContact(idWrong, idUserToAdd)).to.throw(TypeError, `idUser ${idWrong} is not a string`)
            idWrong = []
            expect(() => addContact(idWrong, idUserToAdd)).to.throw(TypeError, `idUser ${idWrong} is not a string`)

        })

        it('should fail on a non-string idUserToAdd', () => {
            let idWrong
            idWrong = 9328743289
            expect(() => addContact(idUser, idWrong)).to.throw(TypeError, `idUserToAdd ${idWrong} is not a string`)
            idWrong = false
            expect(() => addContact(idUser, idWrong)).to.throw(TypeError, `idUserToAdd ${idWrong} is not a string`)
            idWrong = undefined
            expect(() => addContact(idUser, idWrong)).to.throw(TypeError, `idUserToAdd ${idWrong} is not a string`)
            idWrong = []
            expect(() => addContact(idUser, idWrong)).to.throw(TypeError, `idUserToAdd ${idWrong} is not a string`)

        })


    })
        


    after(() => Promise.all([User.deleteMany()]).then(() => mongoose.disconnect()))
})