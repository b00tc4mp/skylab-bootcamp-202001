require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { models: { User, Game } } = require('simonline-data')
const { expect } = require('chai')
const { random } = Math
const createGame = require('./create-game')
const { mongoose } = require('simonline-data')

describe('createGame', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    )

    let name, owner

    beforeEach(() => {
        name = `name-${random()}`
        username = `username-${random()}`
        password = `password-${random()}`
    })

    describe('when user already exists', () => {
        let id

        beforeEach(() =>
            User.create({ username, password })
                .then((user) => {
                    id = user.id
                    owner = id
                })
        )

        it('should succeed on valid data', () => {

            return createGame(name, owner)
                .then(() =>
                    Game.findOne({ name, owner })
                )
                .then(game => {
                    expect(game).to.exist
                    expect(game.name).to.equal(name)
                    expect(game.owner).to.be.an.instanceOf(Object)
                })
        })

        it('should fail on incorrect data', () => {
            return createGame(`${name}-wrong`, owner)
                .then(() => { throw new Error('should not reach this point') })
                .catch((error) => {
                    expect(error).to.exist
                    expect(error).to.be.an('error')
                })
        })

        it('should fail on a non-string name', () => {
            let name = 1
            expect(() => createGame(name, owner)).to.throw(TypeError, `name ${name} is not a string`)

            name = false
            expect(() => createGame(name, owner)).to.throw(TypeError, `name ${name} is not a string`)

            name = undefined
            expect(() => createGame(name, owner)).to.throw(TypeError, `name ${name} is not a string`)

            name = []
            expect(() => createGame(name, owner)).to.throw(TypeError, `name ${name} is not a string`)
        })

        it('should fail on a non-string owner', () => {
            let owner = 1
            expect(() => createGame(name, owner)).to.throw(TypeError, `owner ${owner} is not a string`)

            owner = false
            expect(() => createGame(name, owner)).to.throw(TypeError, `owner ${owner} is not a string`)

            owner = undefined
            expect(() => createGame(name, owner)).to.throw(TypeError, `owner ${owner} is not a string`)

            owner = []
            expect(() => createGame(name, owner)).to.throw(TypeError, `owner ${owner} is not a string`)
        })

        afterEach(() => {
            Game.deleteOne({ name })
            User.deleteOne({ id })
        })

    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})