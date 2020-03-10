require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, listing } } = require('listings-data')
const { expect } = require('chai')
const { random } = Math
const retrievePublishedlistings = require('./retrieve-published-listings')

describe('retrievePublishedlistings', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), listing.deleteMany()]))
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
        let _id, _other

        beforeEach(() =>
            User.insertMany([
                { name, surname, email, password },
                { name, surname, email, password }
            ])
                .then(([{ id }, { id: other }]) => {
                    _id = id
                    _other = other
                })
                .then(() => {
                    const listings = []

                    const now = new Date

                    date = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())

                    for (let i = 0; i < 20; i++)
                        listings.push({ publisher: i < 10 ? _id : _other, title, description, date, location })

                    return listing.insertMany(listings)
                })
        )

        it('should succeed on correct and valid and right data', () =>
            retrievePublishedlistings(_id)
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

    after(() => Promise.all([User.deleteMany(), listing.deleteMany()]).then(() => mongoose.disconnect()))
})