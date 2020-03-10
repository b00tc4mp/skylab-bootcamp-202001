const { validate } = require('pill-o-clock-utils')
const { models: { User, Drug, Guideline } } = require('pill-o-clock-data')
const { NotFoundError, NotAllowedError } = require('pill-o-clock-errors')

module.exports = (id, drugName, time) => { 
    validate.string(id, 'id')
    validate.string(drugName, 'drugName')
    //validate.type(time, 'time', Date)

    let _user
    let _drug

    return Promise.all([User.findById(id), Drug.findOne({drugName}) ])
        .then(([user, drug]) => { 
            if (!drug) throw new NotFoundError(`drug with name ${drugName} not found`)
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            _user = user
            _drug = drug

            _user.medication.forEach(drug => { 
                if (drug.drugName === drugName) throw new NotAllowedError(`user medication already have ${drugName} drug`)
            }) //TODO buscar que no este el medicamento prescrito

            const guideline = new Guideline({created: new Date, prescribed: _user, schedule: [{drug: _drug, times: [time]}]})

            _user.prescription.push(guideline)

            return Promise.all([ _user.save(), guideline.save()])
        })
        .then(() => {})
}