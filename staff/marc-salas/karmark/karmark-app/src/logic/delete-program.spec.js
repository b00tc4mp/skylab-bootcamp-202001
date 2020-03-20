const { random } = Math
const { mongoose, models: { User, Program } } = require('karmark-data')
const { deleteProgram } = require('./index')
const jwt = require('jsonwebtoken')
import context from './context'

const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
} } = process

describe('deleteProgram', () => {
    let name, surname, username, password, programName, code, _id, programId
    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

        await User.deleteMany()

        await Program.deleteMany()

    })
    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        password = `password-${random()}`
        programName = `programeName-${random()}`
        code = ['up', 'down', 'right', 'left']
    })

    describe('when user has programs', () => {
        beforeEach(() =>
            User.create({ name, surname, username, password })
                .then(({ id }) =>{
                    _id = id
                    context.token = jwt.sign({ sub: id }, TEST_JWT_SECRET)
                })
                .then(() => Program.create({ name: programName, created: new Date, author: _id, code }))
                .then(({id}) =>{
                    return programId = id
                })
                .then((id) =>{
                    return User.findByIdAndUpdate({_id}, {programs: id})
                })
        )

        it('should delete the program on correct credentials', async () =>{
            const response = await deleteProgram(programId)

            console.log(response)
            expect(response).toBeUndefined()
        })


    })
})