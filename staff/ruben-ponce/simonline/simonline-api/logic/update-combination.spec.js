require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { models: { User, Game } } = require('simonline-data')
const { expect } = require('chai')
const { random } = Math
const updateCombination = require('./update-combination')
const { mongoose } = require('simonline-data')
require('../../simonline-utils/shuffle')()

describe('createGame', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    )

    let username, password, name, owner, gameId, playerId

    beforeEach(() => {
        name = `name-${random()}`
        username = `username-${random()}`
        password = `password-${random()}`
    })

    describe('when user already exists', () => {

        beforeEach(async() => {
            let users = []

            for (let i = 0; i < 10; i++)
                await User.create({ username, password })
                    .then(user => {
                        playerId = user.id
                        owner = playerId
                        users.push(user.id)
                    })

                await Game.create({ name, owner })
                .then(game => {
                    debugger
                    game.players = users
                    game.owner.id = owner
                    game.players.shuffle()
                    gameId = game.id
                    
                    return game.save()
                })
        })

        it('should succeed on valid data', () => {

            return updateCombination(gameId)
                .then(() =>
                    Game.findOne({ name, owner })
                )
                .then(game => {
                    expect(game).to.exist
                    expect(game.name).to.equal(name)
                    expect(game.owner).to.be.an.instanceOf(Object)
                })
        })

        it('should fail on a non-string gameId', () => {
            let gameId = 1
            expect(() => updateCombination(gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)

            gameId = false
            expect(() => updateCombination(gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)

            gameId = undefined
            expect(() => updateCombination(gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)

            gameId = []
            expect(() => updateCombination(gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)
        })

        afterEach(() => {
            Game.deleteOne({ name })
            User.deleteOne({ playerId })
        })

    })

    after(() => Promise.all([User.deleteMany(), Game.deleteMany()]).then(() => mongoose.disconnect()))
})