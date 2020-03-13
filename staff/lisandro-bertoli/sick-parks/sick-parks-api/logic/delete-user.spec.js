require('dotenv').config()

const deleteUser = require('./delete-user')
const { expect } = require('chai')
const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('sick-parks-data')
const { NotAllowedError, NotFoundError } = require('sick-parks-errors')
const bcrypt = require('bcryptjs')

describe('deleteUser', () => {
    before(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await User.deleteMany()
    })

    let name, surname, email, password

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `${Math.random()}@email.com`
        password = `password-${Math.random()}`
    })

    describe('when user exists', () => {
        let _id
        beforeEach(async () => {
            const _password = await bcrypt.hash(password, 10)

            const { id } = await User.create({ name, surname, email, password: _password })
            _id = id
        })


        it('should succeed removing the user', async () => {
            const returnVal = await deleteUser(_id, password)

            expect(returnVal).to.be.undefined

            const user = await User.findById(_id)

            expect(user).to.be.null

        })

        it('should fail on incorrect password', async () => {
            password = password + 'wrong'
            try {
                await deleteUser(_id, password)
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.be.instanceOf(NotAllowedError)
                expect(error.message).to.equal('incorrect password')
            }
        })
    })

    it('should fail on incorrect id', async () => {
        let _id = '5e6536527984d5537dd3f385'

        try {
            await deleteUser(_id, password)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal(`user with id ${_id} does not exist`)
        }
    })


    after(async () => {
        await User.deleteMany()
        await mongoose.disconnect()

    })
})