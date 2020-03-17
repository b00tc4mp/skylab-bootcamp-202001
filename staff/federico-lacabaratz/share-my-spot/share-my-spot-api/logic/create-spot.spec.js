require('dotenv').config()
const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User, Spot } } = require('share-my-spot-data')
const createSpot = require('./create-spot')
var chai = require('chai')
chai.use(require('chai-fs'))
const path = require('path')

const { env: { TEST_MONGODB_URL } } = process

describe('createSpot', () => {
    let publisherId, title, description, addressLocation, addressStNumber, addressOther, hourStarts, hourEnds, mon, tue, wed, thu, fri, sat, sun, length, width, height, area, price, acceptsBarker, surveillance, isCovered

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Spot.deleteMany()]))
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
            createSpot(_id, title, description, addressLocation, addressStNumber, addressOther, hourStarts, hourEnds, mon, tue, wed, thu, fri, sat, sun, length, width, height, area, price, acceptsBarker, surveillance, isCovered)
                .then(() =>
                    Promise.all([
                        User.findById(_id),
                        Spot.findOne({ title, description, addressLocation, addressStNumber, addressOther, hourStarts, hourEnds, mon, tue, wed, thu, fri, sat, sun, length, width, height, area, price, acceptsBarker, surveillance, isCovered, publisherId: _id })
                    ])
                )
                .then(([user, spot]) => {
                    expect(user).to.exist
                    expect(user.publishedSpots).to.contain(spot._id)
                    expect(spot).to.exist
                    expect(spot.title).to.equal(title)
                    expect(spot.description).to.equal(description)
                    expect(spot.addressLocation).to.equal(addressLocation)
                    expect(spot.addressStNumber).to.equal(addressStNumber)
                    expect(spot.addressOther).to.equal(addressOther)
                    expect(spot.dateStarts).to.be.an.instanceof(Date)
                    expect(spot.dateEnds).to.be.an.instanceof(Date)
                    expect(spot.hourStarts).to.equal(hourStarts)
                    expect(spot.hourEnds).to.equal(hourEnds)
                    expect(spot.mon).to.equal(mon)
                    expect(spot.tue).to.equal(tue)
                    expect(spot.wed).to.equal(wed)
                    expect(spot.thu).to.equal(thu)
                    expect(spot.fri).to.equal(fri)
                    expect(spot.sat).to.equal(sat)
                    expect(spot.sun).to.equal(sun)
                    expect(spot.length).to.equal(length)
                    expect(spot.width).to.equal(width)
                    expect(spot.height).to.equal(height)
                    expect(spot.area).to.equal(area)
                    expect(spot.price).to.equal(price)
                    expect(spot.acceptsBarker).to.equal(acceptsBarker)
                    expect(spot.surveillance).to.equal(surveillance)
                    expect(spot.isCovered).to.equal(isCovered)
                    expect(spot.publisherId.toString()).to.equal(_id)
                    expect(path.join(__dirname, `../data/spots/${spot.id}`)).to.be.a.directory()
                })
        )
    })

    // TODO more happies and unhappies

    after(() => Promise.all([User.deleteMany(), Spot.deleteMany()]).then(() => mongoose.disconnect()))
})