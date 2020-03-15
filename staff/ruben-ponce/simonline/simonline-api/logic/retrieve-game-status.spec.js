require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { models: { User, Game } } = require('simonline-data')
const { expect } = require('chai')
const { random } = Math
require('../../simonline-utils/shuffle')()
const retrieveGameStatus = require('./retrieve-game-status')
const { mongoose } = require('simonline-data')

describe('retrieveGameStatus', () => {
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
        let gameId, playerId
        
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

                return Game.create({ name, owner })
                .then(game => {
                    game.players = users
                    game.players.shuffle()
                    gameId = game.id
                    game.pushCombination.push(combination)
                    game.date = new Date()
                    game.currentPlayer = game.players[0]
                    game.status = "started"
                    game.timeRemaining = 40
                    return game.save()
                })
        })

        it('should succeed on valid retrieved data', async () => {

        const game = await retrieveGameStatus(playerId, gameId)
        console.log(game)
            
        })

    })

    //after(() => Promise.all([User.deleteMany(), Game.deleteMany()]).then(() => mongoose.disconnect()))

})