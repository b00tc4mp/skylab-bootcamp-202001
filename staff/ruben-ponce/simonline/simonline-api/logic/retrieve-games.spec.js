require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveGames = require('./retrieve-games')
const { mongoose, models: { Game, User } } = require('simonline-data')

describe('retrieve-games', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Game.deleteMany())
    )

    let name, owner, id, gameId
    
    beforeEach(() => {
        name = `name-${random()}`
        username = `username-${random()}`
        password = `password-${random()}`
    })

    describe('when game already exists', () => {

        beforeEach(() => {
            return User.create({username, password})
                .then(user => {
                    id = user.id
                    owner = user.id
                })
                .then(() => {
                    return Game.create({name, owner})
                        .then(game => gameId = game.id)
                })
        })
        
        it('should succeed on correct retrieved data', () =>
            retrieveGames()
                .then(game => {
                    expect(game[0].id).to.equal(gameId)
                    expect(game[0].name).to.equal(name)
                    expect(game[0].status).to.equal("waiting")
                    expect(game[0].owner).to.be.an.instanceOf(Object)
                })
        )

        afterEach(() => {
            Game.deleteOne({ owner })
                .then(() => { })
        })
    })

    after(() => Game.deleteMany().then(() => mongoose.disconnect()))
})