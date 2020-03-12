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
        owner = `owner-${random()}`
        username = owner
        password = `password-${random()}`
    })

    describe('when user already exists', () => {
        let id

        beforeEach(() =>
            User.create(new User({ username, password }))
                .then((user) => id = user.id)
        )

        it('should succeed on valid data', () => {

            return createGame(name, owner)
                .then(() =>
                    Game.findOne({ name, owner })
                )
                .then(game => {
                    expect(game).to.exist
                    expect(game.name).to.equal(name)
                    expect(game.owner).to.equal(owner)
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

        afterEach(() => {
            Game.deleteOne({ name })
            User.deleteOne({ id })
        })

    })

    after(() => mongoose.disconnect())
})