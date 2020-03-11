const { validate } = require('staycar-utils')
const { models: { User, Parking } } = require('staycar-data')
const { NotFoundError } = require('staycar-errors')

module.exports = (id, pkName) => {
    validate.string(id, 'id')
    validate.string(pkName, 'pkName')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            //return user.save()
            return Parking.findOne({parkingName: pkName})
                .lean()
                .then(parking => {
                    debugger
                    if (!parking) throw new NotFoundError(`parking with name ${pkName} does not exist`)
                
                    //return parking[0]._id
                    parking.id = parking._id.toString()

                    delete parking._id 

                    return parking.id
                })  
        })
}