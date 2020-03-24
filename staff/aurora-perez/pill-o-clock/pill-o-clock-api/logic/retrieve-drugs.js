const { validate } = require('pill-o-clock-utils')
const { models: { Drug } } = require('pill-o-clock-data')
const { NotFoundError } = require('pill-o-clock-errors')

module.exports = () => {

    return Drug.find().lean()
        .then(drugs => {
            drugs.forEach(drug => {
                drug.id = drug._id

                delete drug._id
            })

            return drugs
        })
}