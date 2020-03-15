const { validate } = require('../../share-my-spot-utils')
const { models: { User, Booking, Listing } } = require('../../share-my-spot-data')
const { NotFoundError, NotAllowedError } = require('../../share-my-spot-errors')

module.exports = (userToBook, publisher, listingId, dateStarts, dateEnds, status) => {
    validate.string(userToBook, 'userToBook')
    validate.string(publisher, 'publisher')
    validate.string(listingId, 'listingId')
    dateStarts.type(dateStarts, 'dateStarts'): { type: Date, required: true },
    dateEnds: { type: Date, required: true },
    status: {type: String, default: 'red'},

    validate.string(number, 'number')
    return (async () => {
        const user = await User.findById(userToBook)
        if (!user) throw new NotFoundError(`user with id ${userToBook} not found`)
        
        const publisher = await Listing.findById(publisher)
        if (!publisher) throw new NotFoundError(`user with id ${publisher} not found`)

        const listing = await Listing.findById(listingId)
        if (!listing) throw new NotFoundError(`ad with id ${listingId} not found`)


        
    })()

    date = new Date(date)
    validate.type(date, 'date', Date)
    const now = new Date(Date.now())
    if ((date.getHours()) < 8 || (date.getHours()) > 22) {
        throw new NotAllowedError('Bookings only allowed between 8 and 22 hours')
    }

    //Bookings only allowed for the next 48 hours
    let limitTime = new Date(now)
    limitTime.setDate(limitTime.getDate() + 2)
    if (date > limitTime) {
        throw new NotAllowedError('Bookings only allowed for the next 48 hours')
    }

    let usersArray = []
    let booking
    let user4_
    let user3_
    let user2_
    let court_
    let user1_

    return User.findOne({ memberNumber: user2 })
        .then(user2 => {
            if (!user2) throw new NotFoundError(`user with member number ${user2} not found`)
            user2_ = user2
            return User.findById(userToBook)
        })
        .then(user => {
            user1_ = user
            return User.findOne({ memberNumber: user3 })
        })
        .then(user3 =>{
            user3_ = user3
            return User.findOne({ memberNumber: user4 })
        })
        .then(user4 => {
            user4_ = user4
            return Court.findOne({ number })   
        })
        .then(court => {
            court_ = court
            return Booking.findOne({ court: court_.id, date })
        })
        .then(bookExists => {
            if (bookExists) throw new NotFoundError(`court ${number} already booked for ${date}`)
            return Booking.findOne({users: userToBook, day: dateWithoutHour})
        })
        .then(book => {
            if (book) {
                throw new NotAllowedError (`This user has already booked a court for ${dateWithoutHour}`)
            }
            
            if (user3 && user4){
                booking = new Booking({ users:[userToBook, user2_.id, user3_.id, user4_.id], court: court_.id, date, day: dateWithoutHour, status: "PRE" })
                user3_.bookings.push(booking.id)
                user4_.bookings.push(booking.id)
                usersArray.push(user1_, user2_, user3_, user4_)
                Promise.all([user3_.save(), user4_.save()])
            }
            else{
                usersArray.push(user1_, user2_)
                booking = new Booking({ users:[userToBook, user2_.id], court: court_.id, date, day: dateWithoutHour, status: "PRE" })      
            }
            user1_.bookings.push(booking.id)
            user2_.bookings.push(booking.id)
            return Promise.all([user1_.save(), user2_.save(), booking.save()])
        })
        .then(() => {})
}