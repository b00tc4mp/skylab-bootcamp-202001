require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { models: { User, Game }, mongoose } = require('simonline-data')
const { expect } = require('chai')
const { random } = Math
const startGame = require('./start-game')
require('../../simonline-utils/shuffle')()
var ObjectId = require('mongodb').ObjectID;

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
                    // expect(game.owner).to.contain(ObjectId(owner))
                    expect(game.status).to.equal("started")
                    expect(game.players.length).to.equal(10)
                    expect(game.date).to.exist
                    expect(game.pushCombination.length).to.equal(1)
                    expect(game.watching).to.be.empty
                    expect(game.combinationViewed).to.be.empty
                })
        })

    })

    after(() => Promise.all([User.deleteMany(), Game.deleteMany()]).then(() => mongoose.disconnect()))

})