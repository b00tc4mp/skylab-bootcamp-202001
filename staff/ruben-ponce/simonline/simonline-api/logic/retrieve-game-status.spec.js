require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { models: { User, Game } } = require('simonline-data')
const { expect } = require('chai')
const { random } = Math
const retrieveGameStatus = require('./start-game')
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
        owner = username
    })

    describe('when user and game already exists', () => {
        let gameId
        
        beforeEach(async() => {
            let users = []
            let combination = Math.floor(random() * 4)

            for (let i = 0; i < 10; i++)
                await User.create({ username, password })
                    .then(user => users.push(user.id))

                return Game.create({ name, owner })
                .then(game => {
                    game.players = users
                    game.players.shuffle()
                    gameId = game.id
                    game.players.shuffle()
                    game.combinationGame.push(combination)
                    game.date = Date.now()
                    game.currentPlayer = game.players[0]//indice
                    game.status = "preStarted"
                    game.timeRemaining = 400
                    
                    return game.save()
                })
        })

        it('should succeed on valid retrieved data', () => {
            return retrieveGameStatus(gameId)
            .then(() => {
                Game.findOne({ gameId })
            })
        })

    })

    //after(() => Promise.all([User.deleteMany(), Game.deleteMany()]).then(() => mongoose.disconnect()))

})