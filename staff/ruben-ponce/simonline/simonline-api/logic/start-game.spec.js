require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { models: { User, Game }, mongoose } = require('simonline-data')
const { expect } = require('chai')
const { random } = Math
const startGame = require('./start-game')
require('../../simonline-utils/shuffle')()

describe('startGame', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    )

    let name, owner, username, password

    beforeEach(() => {
        username = `username-${random()}`
        password = `password-${random()}`
        name = `name-${random()}`
    })

    describe('when user and game already exists', () => {
        let gameId, playerId
        
        beforeEach(async() => {
            let users = []

            for (let i = 0; i < 10; i++)
                await User.create({ username, password })
                    .then(user => {
                        playerId = user.id
                        owner = playerId
                        users.push(user.id)
                    })

                return Game.create({ name, owner })
                .then(game => {
                    game.players = users
                    game.owner.id = owner
                    game.players.shuffle()
                    gameId = game.id
                    
                    return game.save()
                })
        })

        it('should succeed on valid data', () => {

            return startGame(playerId, gameId)
                .then(() =>
                    Game.findOne({ name, owner })
                )
                .then(game => {
                    expect(game).to.exist
                    expect(game.name).to.equal(name)
                    expect(game.status).to.equal("started")
                    expect(game.players.length).to.equal(10)
                    expect(game.date).to.exist
                    expect(game.pushCombination.length).to.equal(1)
                    expect(game.watching).to.be.empty
                    expect(game.combinationViewed).to.be.empty
                })
        })

        it('should fail on a non-string playerId', () => {
            let playerId = 1
            expect(() => startGame(playerId, gameId)).to.throw(TypeError, `playerId ${playerId} is not a string`)

            playerId = false
            expect(() => startGame(playerId, gameId)).to.throw(TypeError, `playerId ${playerId} is not a string`)

            playerId = undefined
            expect(() => startGame(playerId, gameId)).to.throw(TypeError, `playerId ${playerId} is not a string`)

            playerId = []
            expect(() => startGame(playerId, gameId)).to.throw(TypeError, `playerId ${playerId} is not a string`)
        })

        it('should fail on a non-string gameId', () => {
            let gameId = 1
            expect(() => startGame(playerId, gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)

            gameId = false
            expect(() => startGame(playerId, gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)

            gameId = undefined
            expect(() => startGame(playerId, gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)

            gameId = []
            expect(() => startGame(playerId, gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)
        })

    })

    after(() => Promise.all([User.deleteMany(), Game.deleteMany()]).then(() => mongoose.disconnect()))

})