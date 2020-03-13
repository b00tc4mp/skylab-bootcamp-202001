require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Listing } } = require('share-my-spot-data')
const { expect } = require('chai')
const { random } = Math
const retrieveLastListings = require('./retrieve-last-listings')

describe('retrieveLastListings', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Listing.deleteMany()]))
    )

    let name, surname, email, password, title, description, date, location

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        title = `title-${random()}`
        description = `description-${random()}`
        date = new Date
        location = `location-${random()}`
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(({ id }) => _id = id)
                .then(() => {
                    const listings = []

                    const now = new Date()

                    date = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())

                    for (let i = 0; i < 10; i++)
                        listings.push({ publisher: _id, title, description, date, location })

                    const old = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())

                    for (let i = 0; i < 10; i++)
                        listings.push({ publisher: _id, title, description, date: old, location })

                    return Listing.insertMany(listings)
                })
        )

        it('should succeed on correct and valid and right data', () =>
            retrieveLastListings()
                .then(listings => {
                    expect(listings).to.exist
                    expect(listings).to.have.lengthOf(10)

                    listings.forEach(listing => {
                        expect(listing.id).to.be.a('string')
                        expect(listing._id).to.be.undefined
                        expect(listing.title).to.equal(title)
                        expect(listing.description).to.equal(description)
                        expect(listing.date).to.deep.equal(date)
                        expect(listing.location).to.equal(location)
                        expect(listing.publisher).to.be.a('string')
                        expect(listing.publisher).to.equal(_id)
                    })
                })
        )
    })

    // TODO more happies and unhappies

    after(() => Promise.all([User.deleteMany(), Listing.deleteMany()]).then(() => mongoose.disconnect()))
})