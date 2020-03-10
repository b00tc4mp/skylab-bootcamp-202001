const { models: { Group } } = require('simonline-data')
const { mongoose: { Types: { ObjectId } } } = require('simonline-data')

module.exports = (id) => {
    
    return Group.find({players: ObjectId(id)})
}