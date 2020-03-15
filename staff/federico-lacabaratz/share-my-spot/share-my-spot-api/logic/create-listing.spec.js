require('dotenv').config()
const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User, Listing } } = require('share-my-spot-data')
const createListing = require('./create-listing')
var chai = require('chai')
chai.use(require('chai-fs'))
const path = require('path')

const { env: { TEST_MONGODB_URL } } = process

describe('createListing', () => {
    let publisher, title, description, addressLocation, addressStNumber, addressOther, dateStarts, dateEnds, hourStarts, hourEnds, mon, tue, wed, thu, fri, sat, sun, length, width, height, area, photos, price, acceptsBarker, surveillance, isCovered

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Listing.deleteMany()]))
    )


    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        title = `title-${random()}`
        description = `description-${random()}`
        addressLocation = `addressLocation-${random()}`
        addressStNumber = `addressStNumber-${random()}`
        addressOther = `addressOther-${random()}`
        dateStarts = "2020/03/12"
        dateEnds = "2020/03/23"
        hourStarts = 900
        hourEnds = 1800
        mon = true
        tue = true
        wed = true
        thu = true
        fri = true
        sat = false
        sun = false
        length = 4.5
        width = 2.22
        height = 2.4
        area = 10
        price = 2
        acceptsBarker = true
        surveillance = false
        isCovered = true
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(({ id }) => _id = id)
        )

        it('should succeed on correct data', () =>
            createListing(_id, title, description, addressLocation, addressStNumber, addressOther, dateStarts, dateEnds, hourStarts, hourEnds, mon, tue, wed, thu, fri, sat, sun, length, width, height, area, photos, price, acceptsBarker, surveillance, isCovered)
                .then(() =>
                    Promise.all([
                        User.findById(_id),
                        Listing.findOne({ title, description, addressLocation, addressStNumber, addressOther, dateStarts, dateEnds, hourStarts, hourEnds, mon, tue, wed, thu, fri, sat, sun, length, width, height, area, photos, price, acceptsBarker, surveillance, isCovered, publisher: _id })
                    ])
                )
                .then(([user, listing]) => {
                    expect(user).to.exist
                    expect(user.publishedListings).to.contain(listing._id)
                    expect(listing).to.exist
                    expect(listing.title).to.equal(title)
                    expect(listing.description).to.equal(description)
                    expect(listing.addressLocation).to.equal(addressLocation)
                    expect(listing.addressStNumber).to.equal(addressStNumber)
                    expect(listing.addressOther).to.equal(addressOther)
                    expect(listing.dateStarts).to.be.an.instanceof(Date)
                    expect(listing.dateEnds).to.be.an.instanceof(Date)
                    expect(listing.hourStarts).to.equal(hourStarts)
                    expect(listing.hourEnds).to.equal(hourEnds)
                    expect(listing.mon).to.equal(mon)
                    expect(listing.tue).to.equal(tue)
                    expect(listing.wed).to.equal(wed)
                    expect(listing.thu).to.equal(thu)
                    expect(listing.fri).to.equal(fri)
                    expect(listing.sat).to.equal(sat)
                    expect(listing.sun).to.equal(sun)
                    expect(listing.length).to.equal(length)
                    expect(listing.width).to.equal(width)
                    expect(listing.height).to.equal(height)
                    expect(listing.area).to.equal(area)
                    expect(listing.price).to.equal(price)
                    expect(listing.acceptsBarker).to.equal(acceptsBarker)
                    expect(listing.surveillance).to.equal(surveillance)
                    expect(listing.isCovered).to.equal(isCovered)
                    expect(listing.publisher.toString()).to.equal(_id)
                    expect(path.join(__dirname, `../data/listings/${listing.id}`)).to.be.a.directory()
                })
        )
    })

    // TODO more happies and unhappies

    after(() => Promise.all([User.deleteMany(), Listing.deleteMany()]).then(() => mongoose.disconnect()))
})