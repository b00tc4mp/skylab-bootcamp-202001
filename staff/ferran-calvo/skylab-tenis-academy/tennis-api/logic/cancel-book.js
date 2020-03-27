const { validate } = require('../../tennis-utils')
const { models: { User, Booking } } = require('../../tennis-data')
const { NotFoundError, NotAllowedError } = require('../../tennis-errors')
const nodemailer = require('nodemailer')

module.exports = (userId, bookingId) => {
    validate.string(userId, 'userId')
    validate.string(bookingId, 'bookingId')
    let usersArray_
    let date_
    let court_

    debugger
    return User.findOne({ _id: userId, bookings: bookingId })
        .then((correct) => {
            if (correct) {
                return User.find({ bookings: bookingId })
            }
            else {
                throw new NotAllowedError('This user cannot cancel this book')
            }
        })
        .then(usersArray => {
            usersArray_ = usersArray
            return usersArray.forEach(async user => await User.findByIdAndUpdate(user.id, { $pull: { bookings: bookingId } }))
        })
        .then(() => Booking.findById(bookingId))
        .then(book => {
            date_ = book.date
            court_ = book.court.number
            return Booking.findByIdAndRemove(bookingId)
        })
        .then(() => {
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'info.break.point.club@gmail.com',
                    pass: 'breakpoint123'
                }
            })
            usersArray_.forEach(user =>{
                mailOptions = {
                    from: 'Break Point',
                    to: `${user.email}`,
                    subject: 'Booking cancelled',
                    text: `Your booking for ${date_.toLocaleDateString()} at ${date_.getHours()-1}h of court ${court_} has been cancelled. `
                }
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                })
            })
        })
        .then(() => {})
}