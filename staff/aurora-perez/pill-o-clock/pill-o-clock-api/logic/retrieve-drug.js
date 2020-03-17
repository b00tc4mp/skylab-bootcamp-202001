const { validate } = require('pill-o-clock-utils')
const { models: { Drug } } = require('pill-o-clock-data')
const { NotFoundError } = require('pill-o-clock-errors')

module.exports = (drugName) => {
    validate.string(drugName, 'drugName')

    return Drug.findOne({drugName})
        .then(drug => {

            if(!drug)throw new NotFoundError(`drug with name ${drugName} does not exist`)

            return drug
            
        })

}