const { Schema, Types: { ObjectId } } = require('mongoose')
const Point = require('./point')


module.exports = new Schema({
    name: { type: String, required: true, enum: ['rail', 'box', 'transition', 'kicker', 'pipe'] },
    size: { type: String, required: true, enum: ['s', 'm', 'l', 'xl'] },
    description: String,
    image: String,
    location: Point
    // type: {
    //     type: String,
    //     enum: ['Point'],
    //     required: true
    // },
    // coordinates: {
    //     type: [Number],
    //     required: true
    // }


}) 