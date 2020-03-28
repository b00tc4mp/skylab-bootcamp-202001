const { validate } = require('pill-o-clock-utils')
const { models: { User, Drug } } = require('pill-o-clock-data')
const { NotFoundError, NotAllowedError } = require('pill-o-clock-errors')

module.exports = (id, drugId) => { 
    validate.string(id, 'id')
    validate.string(drugId, 'drugId')

    let _user

    return Promise.all([User.findById(id), Drug.findById(drugId) ])
        .then(([user, drug]) => {
            if (!drug) throw new NotFoundError(`drug with id ${drugId} not found`)
            if (!user) throw new NotFoundError(`user with id ${id} not found`)
            _user = user

            _user.medication.forEach(_drug => {
                if (_drug.drugName === drug.drugName) throw new NotAllowedError(`user medication already have ${_drug.drugName} drug`)
            })

            _user.medication.push(drug)

            return _user.save()
        })
        .then(() => { })
}