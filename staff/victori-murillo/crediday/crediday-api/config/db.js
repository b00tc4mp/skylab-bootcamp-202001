const mongoose = require('mongoose')
const chalk = require('chalk')
const { env: { MONGODB_URL } } = process

var connected = chalk.blue
var error = chalk.bold.yellow
var disconnected = chalk.bold.red
var termination = chalk.bold.magenta

module.exports = () => {

    mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

    mongoose.connection.on('error', function (err) {
        console.log(error("Mongoose default connection has occured " + err + " error"))
    })

    mongoose.connection.on('disconnected', function () {
        console.log(disconnected("Mongoose default connection is disconnected"))
    })

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log(termination("Mongoose default connection is disconnected due to application termination"))
            process.exit(0)
        })
    })

    return mongoose.connection.on('connected', function () {
        console.log(connected("Mongoose default connection is open to", MONGODB_URL))
        return Promise.resolve()
    })
}