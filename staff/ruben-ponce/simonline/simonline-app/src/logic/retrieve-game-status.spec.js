const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL
const { mongoose, models: { User, Game } } = require('simonline-data')
const wait = require('simonline-utils/wait')
const { retrieveGameStatus } = require('./')
const { random } = Math

describe('retrieve-game-status', () => {

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        await User.deleteMany()
        return await Game.deleteMany()
    })

    let username, password, name, owner, game

    beforeEach(async () => {
        username = `username-${random()}`
        password = `password-${random()}`
        name = `name-${random()}`
        owner = username

        let users = []

        for (let i = 0; i < 4; i++) {
            const user = await User.create({ username, password })
            users.push(user)
        }

        game = await Game.create({ name, owner })
    })

    describe('when game start', () => {

        it('should retrieve correct data all players', async () => {

            const retrieve = await retrieveGameStatus(game.id)

        })

    })

    afterAll(async () => {
        await User.deleteMany() 
        await Game.deleteMany()
        return database.disconnect
    })
})





//     describe('when user and game already exists', () => {
//         let gameId, playerId, player1
        
//         beforeEach(async() => {
//             let users = []
//             let combination = Math.floor(random() * 4)

//             for (let i = 0; i < 10; i++)
//                 await User.create({ username, password })
//                     .then(user => {
//                         owner = user.id
//                         playerId = user.id
//                         users.push(user.id)
//                     })

//                 await Game.create({ name, owner })
//                     .then(game => {
//                         game.players = users
//                         game.players.shuffle()
//                         gameId = game.id
//                         game.pushCombination.push(combination)
//                         game.turnStart = new Date()
//                         game.currentPlayer = game.players[0]
//                         game.status = "started"
//                         game.turnTimeout = 1
//                         player1 = game.currentPlayer
//                         return game.save()
//                     })
//         })

//         it('should succeed on valid first retrieved data', async () => {

//             await retrieveGameStatus(playerId, gameId)
//                 .then(game => { 
//                     expect(game).to.exist
//                     expect(game.name).to.equal(name)
//                     expect(game.name).to.be.a("string")
//                     expect(game.owner).to.be.an.instanceOf(Object)
//                     expect(game.status).to.equal("started")
//                     expect(game.players.length).to.equal(10)
//                     expect(game.players).to.be.an.instanceOf(Array)
//                     expect(game.date).to.exist
//                     expect(game.date).to.be.an.instanceOf(Date)
//                     expect(game.pushCombination.length).to.equal(1)
//                     expect(game.pushCombination).to.be.an.instanceOf(Array)
//                     expect(game.watching).to.be.empty
//                     expect(game.watching).to.be.an.instanceOf(Array)
//                     expect(game.combinationViewed).to.be.empty
//                     expect(game.combinationViewed).to.be.an.instanceOf(Array)
//                 })
//         })

//         it('should current player change to watching when the player has passed his turn 1sec', function() {
//             this.timeout(2000);
//             return wait(1500)
//             .then(() => {
//                 return retrieveGameStatus(playerId, gameId)
//                     .then(game => {
//                         expect(game.currentPlayer).to.not.equal(player1)
//                         expect(game.watching.length).to.equal(1)
//                     })
//             })  
//         })

//         it('should fail on a non-string playerId', () => {
//             let playerId = 1
//             expect(() => retrieveGameStatus(playerId, gameId)).to.throw(TypeError, `playerId ${playerId} is not a string`)

//             playerId = false
//             expect(() => retrieveGameStatus(playerId, gameId)).to.throw(TypeError, `playerId ${playerId} is not a string`)

//             playerId = undefined
//             expect(() => retrieveGameStatus(playerId, gameId)).to.throw(TypeError, `playerId ${playerId} is not a string`)

//             playerId = []
//             expect(() => retrieveGameStatus(playerId, gameId)).to.throw(TypeError, `playerId ${playerId} is not a string`)
//         })

//         it('should fail on a non-string gameId', () => {
//             let gameId = 1
//             expect(() => retrieveGameStatus(playerId, gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)

//             gameId = false
//             expect(() => retrieveGameStatus(playerId, gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)

//             gameId = undefined
//             expect(() => retrieveGameStatus(playerId, gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)

//             gameId = []
//             expect(() => retrieveGameStatus(playerId, gameId)).to.throw(TypeError, `gameId ${gameId} is not a string`)
//         })
//     })
// })

// after(() => Promise.all([User.deleteMany(), Game.deleteMany()]).then(() => mongoose.disconnect()))

