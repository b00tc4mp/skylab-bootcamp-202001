const { validate } = require('pill-o-clock-utils')
const { models: { User, Drug } } = require('pill-o-clock-data')
const { NotFoundError, NotAllowedError } = require('pill-o-clock-errors')

module.exports = (id, drugId) => { 
    validate.string(id, 'id')
    validate.string(drugId, 'drugName')
    debugger
    return Promise.all([User.findById(id).lean(), Drug.findById(drugId) ])
        .then(([user, drug]) => {
            if (!drug) throw new NotFoundError(`drug with name ${drugName} not found`)
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            user.prescription.forEach((element) => {
                if(element.drug.toString() === drug._id.toString()) return User.updateOne({id}, {$pull: {prescription: {drug: drugId}}}) 

            })
        })
        .then(() => { })
}