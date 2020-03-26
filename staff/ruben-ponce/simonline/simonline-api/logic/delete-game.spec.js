require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, ObjectId, models: { User, Game } } = require('simonline-data')
const { expect } = require('chai')
const { random } = Math
const deleteGame = require('./delete-game')

describe('delete-game', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Game.deleteMany()]))
    )

    let gameId, owner

    beforeEach(() => {
        username = `username-${random()}`
        password = `password-${random()}`
        name = `name-${random()}`
    })

    describe('when game already exists', () => {

        beforeEach(() => {
            return User.create({ username, password })
            .then((user) => {
                id = user.id
                owner = id
            })
            .then(() => {
                return Game.create({name, owner})
                    .then(game => gameId = game.id)
            })
        })
        
        it('should succeed on correct created game', () => {
            return Game.findById(gameId)
                .then(game => {
                    expect(game).to.exist
                })
        })

        it('should succeed on deleted game', () => {
            return deleteGame(gameId)
                .then(() => {
                    return Game.findById(gameId)
                })
                .then(game => {
                    expect(game).to.not.exist
                })
        })

        it('should fail on a non-string game id', () => {
            let gameId = 1
            expect(() => deleteGame(gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)

            gameId = false
            expect(() => deleteGame(gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)

            gameId = undefined
            expect(() => deleteGame(gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)

            gameId = []
            expect(() => deleteGame(gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)
        })

    })

    after(() => Promise.all([User.deleteMany(), Game.deleteMany()]).then(() => mongoose.disconnect()))
})