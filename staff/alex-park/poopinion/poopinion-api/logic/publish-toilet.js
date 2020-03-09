const { validate } = require('poopinion-utils')
const { models: { User, Toilet } } = require('poopinion-data')
const { NotAllowedError } = require('poopinion-errors')

module.exports = (id, place) => {
    validate.string(id, 'id')
    validate.string(place, 'place')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotAllowedError(`user with id ${id} does not exist`)
            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            const toilet = new Toilet({ place, created: new Date, publisher: id })
            
            user.publishedToilets.push(toilet)
            return Promise.all([user.save(), toilet.save()])
        })
        .then(() => { })
}