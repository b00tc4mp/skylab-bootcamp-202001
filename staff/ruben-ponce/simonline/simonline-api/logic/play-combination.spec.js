require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { models: { User, Game } } = require('simonline-data')
const { expect } = require('chai')
const { random } = Math
const wait = require('simonline-utils/wait')
require('../../simonline-utils/shuffle')()
const playCombination = require('./play-combination')
const { mongoose } = require('simonline-data')

describe('play combination', () => {
    before(() =>
        mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    )

    let name, owner, username, password

    beforeEach(() => {
        username = `username-${random()}`
        password = `password-${random()}`
        name = `name-${random()}`
    })

    describe('when user and game already exists', () => {
        let gameId, playerId, player1
        let combinationPlayer = [2, 2]
        
        beforeEach(async() => {
            let users = []
            let combination = 2

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
                        game.pushCombination.push(combination)

                        game.turnStart = new Date()
                        game.currentPlayer = game.players[0]
                        game.status = "started"
                        game.turnTimeout = 40
                        player1 = game.currentPlayer
                        return game.save()
                    })
        })

        it('should succeed matching correct combination', async () => {

            await playCombination(playerId, combinationPlayer)
                .then(game => { 
                    debugger
                    expect(game).to.exist
                    // expect(game.name).to.equal(name)
                    // expect(game.name).to.be.a("string")
                    // expect(game.owner).to.be.an.instanceOf(Object)
                    // expect(game.status).to.equal("started")
                    // expect(game.players.length).to.equal(10)
                    // expect(game.players).to.be.an.instanceOf(Array)
                    // expect(game.date).to.exist
                    // expect(game.date).to.be.an.instanceOf(Date)
                    // expect(game.pushCombination.length).to.equal(1)
                    // expect(game.pushCombination).to.be.an.instanceOf(Array)
                    // expect(game.watching).to.be.empty
                    // expect(game.watching).to.be.an.instanceOf(Array)
                    // expect(game.combinationViewed).to.be.empty
                    // expect(game.combinationViewed).to.be.an.instanceOf(Array)
                })
        })

    })

})

    //after(() => Promise.all([User.deleteMany(), Game.deleteMany()]).then(() => mongoose.disconnect()))

