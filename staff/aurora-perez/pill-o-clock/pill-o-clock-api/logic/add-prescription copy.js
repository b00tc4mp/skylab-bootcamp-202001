const { validate } = require('pill-o-clock-utils')
const { models: { User, Drug, Guideline } } = require('pill-o-clock-data')
const { NotFoundError, NotAllowedError } = require('pill-o-clock-errors')

module.exports = (id, drugName, time) => { 
    validate.string(drugName, 'drugName')
    validate.type(time, 'time', Number)

    let _user
    let _drug
    let _drugName = drugName

    return Promise.all([User.findById(id).lean(), Drug.findOne({drugName}).lean() ])
        .then(([user, drug]) => { 
            
            if (!drug) throw new NotFoundError(`drug with name ${_drugName} not found`)
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            // user.id = user._id.toString()
            // delete user._id

            // drug.id = drug._id.toString()
            // delete drug._id
            // _user = user
            // _drug = drug

            for (let i = 0; i < user.prescription.length; i++) {
                let _idDrug = user.prescription[i].drug.toString()
                
                return Drug.findById(_idDrug).lean()
                .then(drug => {
                    
                    if (drug.drugName === drugName) throw new NotAllowedError (`user ${user.name} already have ${drugName} in his prescription`)
                    
                })
            }

            return user
        })
        .then (user => {

            const guideline = new Guideline({created: new Date, prescribed: user._id, drug: _drug.id, times: [time]})

            return Promise.all([User.findByIdAndUpdate(user._id, { $push: { prescription: guideline } }), guideline.save()])
            
        })
        .then(() => {})
}