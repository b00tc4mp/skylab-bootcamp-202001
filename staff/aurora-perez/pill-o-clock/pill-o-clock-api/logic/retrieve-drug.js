const { validate } = require('pill-o-clock-utils')
const { models: { Drug } } = require('pill-o-clock-data')
const { NotFoundError } = require('pill-o-clock-errors')

module.exports = (drugName) => {
    validate.string(drugName, 'drugName')

    return Drug.findOne({drugName}).lean()
        .then(drug => {

            if(!drug)throw new NotFoundError(`drug with name ${drugName} does not exist`)

            drug.id = drug._id

            delete drug._id

            return drug
            
        })

}