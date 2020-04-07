require('dotenv').config()
const { env: { TEST_MONGODB_URL } } = process
const { models: { User, Game } } = require('simonline-data')
const { expect } = require('chai')
const { random } = Math
const { wait } = require('simonline-utils')
require('../../simonline-utils/shuffle')()
const retrieveGameStatus = require('./retrieve-game-status')
const { mongoose } = require('simonline-data')

/** At least --timeout 5000 */

describe('retrieveGameStatus', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    )

    let name, owner, username, password

    beforeEach(() => {
        name = `name-${random()}`
    })

    describe('when user and game already exists', () => {
        let gameId, playerId

        it('should succeed on valid first retrieved data with 4 players in start game, finish game and players pushed to watching', async () => {
            let users = []
            let combination = Math.floor(random() * 4)

            for (let i = 0; i < 4; i++) {
                username = `username-${random()}`
                password = `password-${random()}`
                await User.create({ username, password })
                    .then(user => {
                        owner = user.id
                        playerId = user.id
                        users.push(user.id)
                    })
            }

            users.shuffle()

            const players = Array.from(users).shuffle()

            await Game.create({ name, owner })
                .then(game => {
                    game.players = players
                    gameId = game.id
                    game.pushCombination.push(combination)
                    game.turnStart = new Date()
                    game.currentPlayer = players[0]
                    game.status = "started"
                    game.turnTimeout = 1
                    return game.save()
                })

            const cycles = 4

            for (let j = 0; j < cycles; j++)
                await Promise.all(users.map(user =>
                    retrieveGameStatus(user, gameId)
                        .then(game => {
                            expect(game).to.exist
                            expect(game.name).to.equal(name)
                            expect(game.name).to.be.a("string")
                            expect(game.owner).to.be.an.instanceOf(Object)
                            expect(game.status).to.equal("started")
                            expect(game.players.length).to.equal(4)
                            expect(game.players).to.be.an.instanceOf(Array)
                            expect(game.date).to.exist
                            expect(game.date).to.be.an.instanceOf(Date)
                            expect(game.pushCombination.length).to.equal(1)
                            expect(game.pushCombination).to.be.an.instanceOf(Array)
                            expect(game.watching).to.be.empty
                            expect(game.watching).to.be.an.instanceOf(Array)
                            expect(game.combinationViewed).to.be.empty
                            expect(game.combinationViewed).to.be.an.instanceOf(Array)
                        })
                ))


            await wait(1000)

            for (let j = 0; j < cycles; j++)
                await Promise.all(users.map(user =>
                    retrieveGameStatus(user, gameId)
                        .then(game => {
                            expect(game).to.exist
                            expect(game.name).to.equal(name)
                            expect(game.name).to.be.a("string")
                            expect(game.owner).to.be.an.instanceOf(Object)
                            expect(game.status).to.equal("started")
                            expect(game.players.length).to.equal(4)
                            expect(game.players).to.be.an.instanceOf(Array)
                            expect(game.date).to.exist
                            expect(game.date).to.be.an.instanceOf(Date)
                            expect(game.pushCombination.length).to.equal(1)
                            expect(game.pushCombination).to.be.an.instanceOf(Array)
                            expect(game.watching.length).to.equal(1)
                            expect(game.watching).to.be.an.instanceOf(Array)
                            expect(game.watching.map(player => player._id.toString())).to.be.deep.equal([players[0]])
                            expect(game.combinationViewed).to.be.empty
                            expect(game.combinationViewed).to.be.an.instanceOf(Array)

                            expect(game.currentPlayer.toString()).to.equal(players[1])
                        })
                ))

            await wait(1000)

            for (let j = 0; j < cycles; j++)
                await Promise.all(users.map(user =>
                    retrieveGameStatus(user, gameId)
                        .then(game => {
                            expect(game).to.exist
                            expect(game.name).to.equal(name)
                            expect(game.name).to.be.a("string")
                            expect(game.owner).to.be.an.instanceOf(Object)
                            expect(game.status).to.equal("started")
                            expect(game.players.length).to.equal(4)
                            expect(game.players).to.be.an.instanceOf(Array)
                            expect(game.date).to.exist
                            expect(game.date).to.be.an.instanceOf(Date)
                            expect(game.pushCombination.length).to.equal(1)
                            expect(game.pushCombination).to.be.an.instanceOf(Array)
                            expect(game.watching.length).to.equal(2)
                            expect(game.watching).to.be.an.instanceOf(Array)
                            expect(game.watching.map(player => player._id.toString())).to.be.deep.equal([players[0], players[1]])
                            expect(game.combinationViewed).to.be.empty
                            expect(game.combinationViewed).to.be.an.instanceOf(Array)

                            expect(game.currentPlayer.toString()).to.equal(players[2])
                        })
                ))

            await wait(1000)

            for (let j = 0; j < cycles; j++)
                await Promise.all(users.map(user =>
                    retrieveGameStatus(user, gameId)
                        .then(game => {
                            expect(game).to.exist
                            expect(game.name).to.equal(name)
                            expect(game.name).to.be.a("string")
                            expect(game.owner).to.be.an.instanceOf(Object)
                            expect(game.watching.length).to.equal(3)
                            expect(game.watching).to.be.an.instanceOf(Array)
                            expect(game.watching.map(player => player._id.toString())).to.be.deep.equal([players[0], players[1], players[2]])
                            expect(game.status).to.equal("finished")
                            expect(game.players.length).to.equal(4)
                            expect(game.players).to.be.an.instanceOf(Array)
                            expect(game.date).to.exist
                            expect(game.date).to.be.an.instanceOf(Date)
                            expect(game.pushCombination.length).to.equal(1)
                            expect(game.pushCombination).to.be.an.instanceOf(Array)
                            expect(game.combinationViewed).to.be.empty
                            expect(game.combinationViewed).to.be.an.instanceOf(Array)

                            expect(game.currentPlayer.toString()).to.equal(players[3])
                        })
                ))

            await wait(1000)

            for (let j = 0; j < cycles; j++)
                await Promise.all(users.map(user =>
                    retrieveGameStatus(user, gameId)
                        .then(game => {
                            expect(game).to.exist
                            expect(game.name).to.equal(name)
                            expect(game.name).to.be.a("string")
                            expect(game.owner).to.be.an.instanceOf(Object)
                            expect(game.watching.length).to.equal(3)
                            expect(game.watching).to.be.an.instanceOf(Array)
                            expect(game.watching.map(player => player._id.toString())).to.be.deep.equal([players[0], players[1], players[2]])
                            expect(game.status).to.equal("finished")
                            expect(game.players.length).to.equal(4)
                            expect(game.players).to.be.an.instanceOf(Array)
                            expect(game.date).to.exist
                            expect(game.date).to.be.an.instanceOf(Date)
                            expect(game.pushCombination.length).to.equal(1)
                            expect(game.pushCombination).to.be.an.instanceOf(Array)
                            expect(game.combinationViewed).to.be.empty
                            expect(game.combinationViewed).to.be.an.instanceOf(Array)

                            expect(game.currentPlayer.toString()).to.equal(players[3]) // TODO nobody should win!
                        })
                ))
        })

        it('should fail on a non-string playerId', () => {
            let playerId = 1
            expect(() => retrieveGameStatus(playerId, gameId)).to.throw(TypeError, `playerId ${playerId} is not a string`)

            playerId = false
            expect(() => retrieveGameStatus(playerId, gameId)).to.throw(TypeError, `playerId ${playerId} is not a string`)

            playerId = undefined
            expect(() => retrieveGameStatus(playerId, gameId)).to.throw(TypeError, `playerId ${playerId} is not a string`)

            playerId = []
            expect(() => retrieveGameStatus(playerId, gameId)).to.throw(TypeError, `playerId ${playerId} is not a string`)
        })

        it('should fail on a non-string gameId', () => {
            let gameId = 1
            expect(() => retrieveGameStatus(playerId, gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)

            gameId = false
            expect(() => retrieveGameStatus(playerId, gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)

            gameId = undefined
            expect(() => retrieveGameStatus(playerId, gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)

            gameId = []
            expect(() => retrieveGameStatus(playerId, gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)
        })
    })


    after(() => Promise.all([User.deleteMany(), Game.deleteMany()]).then(() => mongoose.disconnect()))
})

