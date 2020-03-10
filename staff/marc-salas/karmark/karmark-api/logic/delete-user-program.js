const {validate} = require('karmark-utils')
const {models: {Program, User}} = require('karmark-data')

module.exports = (author, id) => {
    validate.string(author, 'author')
    validate.string(id, 'id')

    return User.findByIdAndUpdate( author, {$pull: { programs: author }})
        .then(() => Program.deleteOne({_id: id}))
        .then(() => {})

}