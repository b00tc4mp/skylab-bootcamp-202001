const Model = require('./model')
const { event } = require('../schemas')

module.exports = class Event extends Model {
    constructor(data) {
        super(data, event)

        this.created = new Date
    }
}