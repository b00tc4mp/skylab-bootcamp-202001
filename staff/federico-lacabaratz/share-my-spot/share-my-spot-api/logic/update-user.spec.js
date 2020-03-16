require('dotenv').config()

const updateUser = require('./update-user')
const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('share-my-spot-data')
const { NotAllowedError } = require('share-my-spot-errors')
const { expect } = require('chai')
const { random } = Math
const bcrypt = require('bcryptjs')



describe('updateUser', () => {
    before(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await User.deleteMany()
    })

    let name, surname, email, password, userId, oldPassword, phone

    beforeEach(() => {
        name = 'name-' + random()
        surname = 'surname-' + random()
        email = random() + '@mail.com'
        password = 'password-' + random()
        phone = 'phone-' + random()
    })

    describe('when user already exists', () => {

        beforeEach(async () => {
            const _password = await bcrypt.hash(password, 10)
            const user = await User.create({ name, surname, email, password: _password })
            userId = user.id
        })

        it('should succeed on valid id and credentials', async () => {
            email = 'update-@email.com'
            password += '-update'
            oldPassword = password
            phone += '-update'

            await updateUser(userId, { email, password, oldPassword, phone })

            const _user = await User.findById(userId).lean()

            expect(_user.email).to.equal(email)
            const validPassword = await bcrypt.compare(password, _user.password)            
            expect(validPassword).to.be.true
            expect(_user.phone).to.equal(phone)

        })

        it('should fail on invalid oldPassword', async () => {
            email = 'update-@email.com'
            oldPassword = password + 'wrong'
            password += '-update'
            phone += '-update'

            try {
                await updateUser(userId, { email, password, oldPassword, phone })
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
        data = { password: '123' }
        expect(() =>
            updateUser(userId, data)
        ).to.Throw(Error, `old Password is needed to change password`)

        data = { oldPassword: '123' }
        expect(() =>
            updateUser(userId, data)
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