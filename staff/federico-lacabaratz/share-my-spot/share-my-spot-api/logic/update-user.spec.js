require('dotenv').config()

const updateUser = require('./update-user')
const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { Park, User } } = require('share-my-spot-data')
const { NotFoundError, NotAllowedError } = require('share-my-spot-errors')
const { expect } = require('chai')
const { random } = Math
const bcrypt = require('bcryptjs')



describe('updateUser', () => {
    before(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await User.deleteMany()
    })


    let name, surname, email, password, userId, oldPassword

    beforeEach(() => {
        name = 'name-' + random()
        surname = 'surname-' + random()
        email = random() + '@mail.com'
        password = 'password-' + random()
    })

    describe('when user already exists', () => {

        beforeEach(async () => {
            const _password = await bcrypt.hash(password, 10)
            const user = await User.create({ name, surname, email, password: _password })
            userId = user.id
        })

        it('should succeed on valid id and credentials', async () => {
            name += '-update'
            email = 'update-@email.com'
            oldPassword = password
            password += '-update'

            await updateUser(userId, { name, email, password, oldPassword })

            const _user = await User.findById(userId).lean()

            expect(_user.name).to.equal(name)
            expect(_user.email).to.equal(email)

            const validPassword = await bcrypt.compare(password, _user.password)

            expect(validPassword).to.be.true

        })

        it('should fail on invalid oldPassword', async () => {
            name += '-update'
            email = 'update-@email.com'
            oldPassword = password + 'wrong'
            password += '-update'

            try {
                await updateUser(userId, { name, email, password, oldPassword })
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.be.an.instanceOf(NotAllowedError)
                expect(error.message).to.equal('wrong credentials')
            }

        })

    })

    it('should fail on non-string id', () => {
        userId = 1
        expect(() =>
            updateUser(userId, {}, () => { })
        ).to.Throw(TypeError, `userId ${userId} is not a string`)

        userId = true
        expect(() =>
            updateUser(userId, {}, () => { })
        ).to.Throw(TypeError, `userId ${userId} is not a string`)

        userId = undefined
        expect(() =>
            updateUser(userId, {}, () => { })
        ).to.Throw(TypeError, `userId ${userId} is not a string`)
    })

    it('should fail on unsatisfying password and oldPassword pair', () => {
        userId = 'asdfasdf'
        password = '123'
        expect(() =>
            updateUser(userId, password)
        ).to.Throw(Error, `oldPassword is not defined`)

        oldPassword = '123'
        expect(() =>
            updateUser(userId, oldPassword)
        ).to.Throw(Error, `password is not defined`)
    })

    it('should fail on non-familiar property', () => {
        userId = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTNiZDhmZDE3YjgwOTFiYWFjMTIxMzgiLCJpYXQiOjE1ODA5ODA3NjEsImV4cCI6MTU4MDk4NDM2MX0.t8g49qXznSCYiK040NvOWHPXWqnj9riJ_6MD2vwIv3M'

        const property = 'hello'

        data = { [property]: 'world' }

        expect(() =>
            updateUser(userId, data)
        ).to.Throw(Error, `property ${property} is not allowed`)
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))

})

// require('dotenv').config()

// const { expect } = require('chai')
// const { random, floor } = Math
// const { mongoose, models: { User } } = require('poopinion-data')
// const updateUser = require('./update-user')
// const bcrypt = require('bcryptjs')
// const { env: { TEST_MONGODB_URL } } = process

// describe('updateUser', () => {
//     let name, surname, email, password, age, gender, _id
//     const GENDERS = ['male', 'female', 'non-binary']

//     before(() =>
//         mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//             .then(() => User.deleteMany())
//     )

//     beforeEach(() => {
//         name = `name-${random()}`
//         surname = `surname-${random()}`
//         email = `email-${random()}@mail.com`
//         password = `password-${random()}`
//         age = floor(random() * 120)
//         gender = GENDERS[floor(random() * GENDERS.length)]
//     })

//     describe('when the user exists', () => {
//         beforeEach(() =>
//             bcrypt.hash(password, 10)
//                 .then(password =>
//                     User.create({ name, surname, email, password, age, gender })
//                 )
//                 .then(user => _id = user.id)
//         )

//         it('should succeed on correct user data', () =>
//             User.findById(_id).lean()
//                 .then(user => {
//                     expect(user).to.exist
//                     expect(user.name).to.equal(name)
//                     expect(user.surname).to.equal(surname)
//                     expect(user.email).to.equal(email)
//                     expect(user.age).to.equal(age)
//                     expect(user.gender).to.equal(gender)
//                 })
//                 .then(() =>
//                     updateUser(_id, { pendejada: 'maxima', name: `${name}-updated`, surname: `${surname}-updated`, email: `${email}-updated`, age: age + 1 }, password)
//                 )
//                 .then(() => User.findById(_id).lean())
//                 .then(user => {
//                     expect(user).to.exist
//                     expect(user._id.toString()).to.be.a('string')
//                     expect(user.name).to.equal(`${name}-updated`)
//                     expect(user.surname).to.equal(`${surname}-updated`)
//                     expect(user.email).to.equal(`${email}-updated`)
//                     expect(user.gender).to.equal(gender)
//                     expect(user.age).to.equal(age + 1)
//                     expect(user.pendejada).to.be.undefined

//                     return bcrypt.compare(password, user.password)
//                 })
//                 .then(validPassword => expect(validPassword).to.be.true)
//         )
//     })

//     describe('when the user does not exist', () => {
//         beforeEach(() => User.deleteMany().then(() => { }))

//         it('should fail to update if the user does not exist', () =>
//             updateUser(_id, { name, surname, email }, password)
//                 .then(() => { throw new Error('should not reach this point') })
//                 .catch(({ message }) => {

//                     expect(message).not.to.be.undefined
//                     expect(message).to.equal(`user with id ${_id} does not exist`)
//                 })
//                 .then(() => { })
//         )
//     })

//     describe('on wrong credentials', () => {
//         beforeEach(() =>
//             User.create({ name, surname, email, password, age, gender })
//                 .then(({ id }) => _id = id)
//                 .then(() => User.findByIdAndUpdate(_id, { $set: { deactivated: true } }))
//                 .then(() => { })
//         )

//         it('should fail to update if the password is wrong', () =>
//             updateUser(_id, { name, surname, email }, `${password}-wrong`)
//                 .then(() => { throw new Error('should not reach this point') })
//                 .catch(({ message }) => {
//                     expect(message).not.to.be.undefined
//                     expect(message).to.equal(`wrong credentials`)
//                 })
//                 .then(() => { })
//         )
//     })

//     describe('unhappy paths', () => {
//         let __id
//         beforeEach(() =>
//             Promise.resolve(User.create({ name, surname, email, password, age, gender }))
//                 .then(({ id }) => {
//                     _id = id
//                     __id = id
//                 })
//                 .then(() => { })
//         )

//         it('should fail on a non-string user id', () => {
//             _id = 9328743289
//             expect(() => updateUser(_id, { surname, email }, password)).to.throw(TypeError, `id ${_id} is not a string`)

//             _id = false
//             expect(() => updateUser(_id, { surname, email }, password)).to.throw(TypeError, `id ${_id} is not a string`)

//             _id = undefined
//             expect(() => updateUser(_id, { surname, email }, password)).to.throw(TypeError, `id ${_id} is not a string`)

//             _id = []
//             expect(() => updateUser(_id, { surname, email }, password)).to.throw(TypeError, `id ${_id} is not a string`)
//         })

//         it('should fail on a non-object data', () => {
//             data = 9328743289
//             expect(() => updateUser(__id, data, password)).to.throw(TypeError, `data ${data} is not a Object`)

//             data = false
//             expect(() => updateUser(__id, data, password)).to.throw(TypeError, `data ${data} is not a Object`)

//             data = undefined
//             expect(() => updateUser(__id, data, password)).to.throw(TypeError, `data ${data} is not a Object`)

//             data = 'function () { }'
//             expect(() => updateUser(__id, data, password)).to.throw(TypeError, `data ${data} is not a Object`)
//         })

//         it('should fail on a non-string password', () => {
//             password = 9328743289
//             expect(() => updateUser(__id, { surname, email }, password)).to.throw(TypeError, `password ${password} is not a string`)

//             password = false
//             expect(() => updateUser(__id, { surname, email }, password)).to.throw(TypeError, `password ${password} is not a string`)

//             password = undefined
//             expect(() => updateUser(__id, { surname, email }, password)).to.throw(TypeError, `password ${password} is not a string`)

//             password = []
//             expect(() => updateUser(__id, { surname, email }, password)).to.throw(TypeError, `password ${password} is not a string`)
//         })
//     })

//     after(() => User.deleteMany().then(() => mongoose.disconnect()))
// })