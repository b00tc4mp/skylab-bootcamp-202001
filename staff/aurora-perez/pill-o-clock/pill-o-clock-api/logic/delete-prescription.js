const { validate } = require('pill-o-clock-utils')
const { models: { User, Drug, Guideline } } = require('pill-o-clock-data')
const { NotFoundError, NotAllowedError } = require('pill-o-clock-errors')

module.exports = (id, drugId) => { 
    validate.string(id, 'id')
    validate.string(drugId, 'drugId')
    
    return Promise.all([User.findById(id), Drug.findById(drugId), Guideline.findOne({prescribed: id, drug: drugId}) ])
        .then(([user, drug, prescript]) => {
            if (!drug) throw new NotFoundError(`drug with name ${drug.drugName} not found`)
            if (!user) throw new NotFoundError(`user with id ${id} not found`)
            if (!prescript) throw new NotFoundError(`prescript within user with id ${id} not found`)
            
            for (let i = 0; i < user.prescription.length; i++) {
                debugger
                if (user.prescription[i].drug.toString() === drug._id.toString()) {
                    return Promise.all([User.findByIdAndUpdate(id, {$pull: {prescription: {_id: user.prescription[i]._id.toString()}}}), Guideline.findByIdAndRemove(prescript._id) ])
                }
            }

           // return Promise.all([User.findByIdAndUpdate(id, {$pull: {prescription: prescript}}), Guideline.findOneAndRemove(prescript._id.toString())])
           
        })
         
        .then(() => { })
}