const {validate} = require('karmark-utils')
const {models: {Program, User}} = require('karmark-data')
const {NotFoundError} = require('karmark-errors')

module.exports = ({name, author, code}) => {
    validate.string(name, 'name')
    validate.string(author, 'author')
    validate.type(code, 'code', Array)

    return User.findById(author)
    .then (user => {
        if (!user) throw new NotFoundError(`user with id ${author} not found`)
        
        const program = new Program({name, created: new Date, author, code})

        user.programs = program.id

        return Promise.all([user.save(), program.save()])
    })
}