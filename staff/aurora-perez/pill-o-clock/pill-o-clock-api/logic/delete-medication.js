const { validate } = require('pill-o-clock-utils')
const { models: { User, Drug } } = require('pill-o-clock-data')
const { NotFoundError, NotAllowedError } = require('pill-o-clock-errors')

module.exports = (id, drugName) => {
    validate.string(id, 'id')
    validate.string(drugName, 'drugName')
    
    let _user

    return Promise.all([User.findById(id), Drug.findOne({drugName}) ])
        .then(([user, drug]) => {
            if (!drug) throw new NotFoundError(`drug with name ${drugName} not found`)
            if (!user) throw new NotFoundError(`user with id ${id} not found`)
            _user = user

            _user.medication.forEach(drug => {
                if (drug.drugName === drugName) _user.medication.pull(drug)
            })

            return _user.save()
        })
        .then(() => { })
}