require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { models: { User, Game } } = require('simonline-data')
const { expect } = require('chai')
const { random } = Math
require('../../simonline-utils/shuffle')()
const retrievePlayersName = require('./retrieve-players-name')
const { mongoose } = require('simonline-data')

describe('retrieveGameStatus', () => {
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
        let gameId, playerId, player1
        
        beforeEach(async() => {
            let users = []
            let combination = Math.floor(random() * 4)

            for (let i = 0; i < 10; i++)
                await User.create({ username, password })
                    .then(user => {
                        owner = user.id
                        playerId = user.id
                        users.push(user.id)
                    })

                await Game.create({ name, owner })
                    .then(game => {
                        game.players = users
                        game.players.shuffle()
                        gameId = game.id
                        game.pushCombination.push(combination)
                        game.turnStart = new Date()
                        game.currentPlayer = game.players[0]
                        game.status = "started"
                        game.turnTimeout = 1
                        player1 = game.currentPlayer
                        return game.save()
                    })
        })

        it('should succeed on valid first retrieved data', async () => {

            await retrievePlayersName(gameId)
                .then(players => { 
                    expect(players).to.exist
                    expect(players).to.be.an.instanceOf(Object)
                })
        })

        it('should fail on a non-string gameId', () => {
            let gameId = 1
            expect(() => retrievePlayersName(gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)

            gameId = false
            expect(() => retrievePlayersName(gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)

            gameId = undefined
            expect(() => retrievePlayersName(gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)

            gameId = []
            expect(() => retrievePlayersName(gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)
        })
    })
})

after(() => Promise.all([User.deleteMany(), Game.deleteMany()]).then(() => mongoose.disconnect()))

