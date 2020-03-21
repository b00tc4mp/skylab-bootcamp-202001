import toggleThumbUp from './toggle-thumb-up'
const { mongoose, models: { User, Toilet, Comment } } = require('poopinion-data')
const { random, floor } = Math
const jwt = require('jsonwebtoken')
const atob = require('atob')
const { NotFoundError, NotAllowedError } = require('../errors')

describe('toggleThumbUp', () => {
    let name, surname, email, password, age, gender, place, latitude, rating, longitude, latitudeDelta, longitudeDelta, coordinates, _id, _toiletId, token, _commentId
    const GENDERS = ['male', 'female', 'non-binary']

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test-poopinion', { useNewUrlParser: true, useUnifiedTopology: true })

        await User.deleteMany()
        await Toilet.deleteMany()
        await Comment.deleteMany()
    })

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        age = floor(random() * 100)
        gender = GENDERS[floor(random() * GENDERS.length)]
        place = `place-${random()}`
        latitudeDelta = random()
        longitudeDelta = random()
        latitude = random()
        longitude = random()
        coordinates = { latitude, longitude, latitudeDelta, longitudeDelta }
        rating = {
            cleanness: floor(random() * 5),
            looks: floor(random() * 5),
            multipleToilets: floor(random() * 2),
            paperDeployment: floor(random() * 2),
            paymentRequired: floor(random() * 2),
            overallRating: floor(random() * 5),
            textArea: `opinion-${random()}`
        }
    })

    describe('happy paths', () => {

        it('should successfully toggle/untoggle a thumb up on a comment made in a toilet post', async () => {
            let user = await User.create({ name, surname, email, password, age, gender });
            _id = user.id
            token = jwt.sign({ sub: _id }, '👌', { expiresIn: '1d' })
            let toilet = await Toilet.create({ publisher: _id, place, coordinates })
            _toiletId = toilet.id
            let comment = await Comment.create({ place, publisher: _id, commentedAt: _toiletId, rating })
            _commentId = comment.id
            await User.findByIdAndUpdate(_id, { $push: { comments: _commentId } })
            await Toilet.findByIdAndUpdate(_toiletId, { $push: { comments: _commentId } })

            const toggle = await toggleThumbUp(token, _commentId)
            expect(toggle).toBeUndefined()

            toilet = await Toilet.findById(_toiletId).populate('comments')
            user = await User.findById(_id).lean()

            expect(toilet.comments).toBeInstanceOf(Array)
            expect(toilet.comments.length).toBe(1)
            expect(toilet.comments[0].publisher.toString()).toMatch(_id)
            expect(toilet.comments[0].thumbsUp).toBeInstanceOf(Array)
            expect(toilet.comments[0].thumbsUp.length).toBe(1)
            expect(toilet.comments[0].thumbsUp[0].toString()).toMatch(_id)

            expect(user.comments).toBeInstanceOf(Array)
            expect(user.comments.length).toBe(1)
            expect(user.thumbsUp).toBeInstanceOf(Array)
            expect(user.thumbsUp.length).toBe(1)
            expect(user.thumbsUp[0].toString()).toMatch(_commentId)

            comment = await Comment.findById(_commentId).lean()

            expect(comment.thumbsUp).toBeInstanceOf(Array)
            expect(comment.thumbsUp.length).toBe(1)
            expect(comment.thumbsUp[0].toString()).toMatch(_id)
            expect(comment.commentedAt.toString()).toMatch(_toiletId)

        })

        it('should successfully untoggle the thumb up as well', async () => {
            await toggleThumbUp(token, _commentId)
            let user = await User.findById(_id).lean()
            let toilet = await Toilet.findById(_toiletId).populate('comments').lean()
            let comment = await Comment.findById(_commentId).lean()

            expect(user.comments).toBeInstanceOf(Array)
            expect(user.comments.length).toBe(1)
            expect(user.thumbsUp).toBeInstanceOf(Array)
            expect(user.thumbsUp.length).toBe(0)
            expect(user.thumbsUp[0]).toBeUndefined()

            expect(toilet.comments).toBeInstanceOf(Array)
            expect(toilet.comments.length).toBe(1)
            expect(toilet.comments[0].publisher.toString()).toMatch(_id)
            expect(toilet.comments[0].thumbsUp).toBeInstanceOf(Array)
            expect(toilet.comments[0].thumbsUp.length).toBe(0)
            expect(toilet.comments[0].thumbsUp[0]).toBeUndefined()

            expect(comment.thumbsUp).toBeInstanceOf(Array)
            expect(comment.thumbsUp.length).toBe(0)
            expect(comment.thumbsUp[0]).toBeUndefined()
            expect(comment.commentedAt.toString()).toMatch(_toiletId)
        })



        it('should fail to toggle/untoggle if the user is deactivated', async () => {
            await User.findByIdAndUpdate(_id, { $set: { deactivated: true } })

            let _error

            try {
                await toggleThumbUp(token, _commentId)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(Error)
            const userId = JSON.parse(atob(token.split('.')[1])).sub
            expect(_error.message).toEqual(`user with id ${userId} is deactivated`)
        })

        it('should fail to toggle thumb up on an invalid token', async () => {
            let _error
            try {
                await toggleThumbUp(`${token}-wrong`, _commentId)
            } catch (error) {
                _error = error
            }

            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(NotAllowedError)
            expect(_error.message).toBe('invalid signature')
        })

        it('should fail to toggle thumb up if the user does not exist', async () => {
            await User.deleteMany()

            let _error
            try {
                await toggleThumbUp(token, _commentId)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(NotFoundError)
            const userId = JSON.parse(atob(token.split('.')[1])).sub
            expect(_error.message).toBe(`user with id ${userId} does not exist`)
        })

        it('should fail to toggle thumb up if the comment does not exist', async () => {
            let user = await User.create({ name, surname, email, password, age, gender });
            _id = user.id
            token = jwt.sign({ sub: _id }, '👌', { expiresIn: '1d' })
            await Comment.deleteMany()

            let _error
            try {
                await toggleThumbUp(token, _commentId)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(NotFoundError)
            expect(_error.message).toBe(`comment with id ${_commentId} does not exist`)
        })

    })

    describe('unhappy paths', () => {
        it('should fail on a non string token', () => {
            token = 45438
            expect(() => toggleThumbUp(token, _commentId)).toThrow(`token ${token} is not a string`)

            token = {}
            expect(() => toggleThumbUp(token, _commentId)).toThrow(`token ${token} is not a string`)

            token = false
            expect(() => toggleThumbUp(token, _commentId)).toThrow(`token ${token} is not a string`)

            token = [1, 2, 3]
            expect(() => toggleThumbUp(token, _commentId)).toThrow(`token ${token} is not a string`)

            token = undefined
            expect(() => toggleThumbUp(token, _commentId)).toThrow(`token is empty`)
        })

        it('should fail on a non-string toilet ID', () => {
            token = 'some token'
            _commentId = 45438
            expect(() => toggleThumbUp(token, _commentId)).toThrow(`commentId ${_commentId} is not a string`)

            _commentId = {}
            expect(() => toggleThumbUp(token, _commentId)).toThrow(`commentId ${_commentId} is not a string`)

            _commentId = false
            expect(() => toggleThumbUp(token, _commentId)).toThrow(`commentId ${_commentId} is not a string`)

            _commentId = [1, 2, 3]
            expect(() => toggleThumbUp(token, _commentId)).toThrow(`commentId ${_commentId} is not a string`)

            _commentId = undefined
            expect(() => toggleThumbUp(token, _commentId)).toThrow(`commentId is empty`)
        })
    })

    afterAll(async () => {
        await User.deleteMany()
        await Toilet.deleteMany()
        await Comment.deleteMany()
        await mongoose.disconnect()
    })
})