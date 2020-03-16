require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Game }, ObjectId } = require('simonline-data')
const { expect } = require('chai')
const { random } = Math
const joinGame = require('./join-game')

describe('join-game', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Game.deleteMany()]))
    )

    let username, password, name, owner, id, gameId

    beforeEach(() => {
        username = `username-${random()}`
        password = `password-${random()}`
        name = `name-${random()}`
    })

    describe('when user already exists', () => {

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
        
        it('should succeed on correct and valid and right data', () =>
            joinGame(id, gameId)
                .then(() =>
                    Promise.all([
                        User.findById(id),
                        Game.findById(gameId)
                    ])
                )
                .then(([user, game]) => {
                    expect(user).to.exist
                    expect(game).to.exist
                    expect(game.name).to.equal(name)
                    expect(game.players).to.contain(id)
                    expect(game.owner).to.be.an.instanceOf(Object)
                })
        )
    })

    after(() => Promise.all([User.deleteMany(), Game.deleteMany()]).then(() => mongoose.disconnect()))
})