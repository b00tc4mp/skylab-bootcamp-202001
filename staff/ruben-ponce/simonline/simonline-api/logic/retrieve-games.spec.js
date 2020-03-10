require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveGames = require('./retrieve-games')
const { mongoose, models: { Game } } = require('simonline-data')

describe('retrieve-games', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Game.deleteMany())
    )

    let name, owner
    
    beforeEach(() => {
        name = `name-${random()}`
        owner = `owner-${random()}`

    })

    describe('when game already exists', () => {
        let _id
        beforeEach(() =>
            Game.create(new Game({ name, owner }))
                .then(({ id }) => _id = id)
        )
        
        it('should succeed on correct retrieved data', () =>
            retrieveGames()
                .then(game => {
                    expect(game[0].name).to.equal(name)
                    expect(game[0].owner).to.equal(owner)
                })
        )

        afterEach(() => {
            Game.deleteOne({ owner })
                .then(() => { })
        })
    })

    after(() => Game.deleteMany().then(() => mongoose.disconnect()))
})