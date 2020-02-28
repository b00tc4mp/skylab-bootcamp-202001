require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { database, models: { User } } = require('../data')
const { expect } = require('chai')
const retrieveUser = require('./retrieve-user')
const { NotFoundError } = require('../errors')

describe('retrieveUser', () => {
    let name, surname, email, password, users


    before(() =>
        database.connect(TEST_MONGODB_URL)
            .then(() => users = database.collection('users'))
    )


    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        email = Math.random() + '@mail.com'
        password = 'password-' + Math.random()

    })
    describe('when user exists', () => {
        let id
        describe('when user is not deactivated', () => {
            beforeEach(() =>
                users.insertOne(new User({ name, surname, email, password }))
                    .then(({ insertedId }) => id = insertedId.toString())
            )

            it('should succeed on valid id, returning the user', () => {
                return retrieveUser(id)
                    .then(user => {
                        expect(user.constructor).to.equal(Object)
                        expect(user.name).to.equal(name)
                        expect(user.surname).to.equal(surname)
                        expect(user.email).to.equal(email)
                        expect(user.password).to.be.undefined
                    })
            })
        })
        // describe('when user is deactivated', () => {
        //     beforeEach(() => {
        //         const user = { id, name, surname, email, password, created: new Date, deactivated: true }

        //         users.push(user)

        //         return fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 4))
        //     })
        //     it('should throw not-allowed-error', () => {
        //         expect(() => {
        //             retrieveUser(id)
        //         }).to.throw(NotAllowedError, `user with id ${id} is deactivated`)
        //     })
        // }) TODO
    })

    describe('when user does not exist', () => {

        let id = '507f1f77bcf86cd799439011'
        it('should fail throwing not-found-error', () => {
            return retrieveUser(id)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal(`user with id ${id} does not exist`)
                })
        })
    })
    it('should fail on non-string or empty id', () => {
        let id = 1
        expect(() => retrieveUser(id)).to.throw(TypeError, `id ${id} is not a string`)

        id = true
        expect(() => retrieveUser(id)).to.throw(TypeError, `id ${id} is not a string`)

        id = {}
        expect(() => retrieveUser(id)).to.throw(TypeError, `id ${id} is not a string`)

        id = ''
        expect(() => retrieveUser(id)).to.throw(Error, `id is empty`)
    })

    after(() => {
        users.deleteMany({})

        return database.disconnect()
    })
})