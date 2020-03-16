const { validate } = require('staycar-utils')
const { models: { User, Parking } } = require('staycar-data')
const { NotFoundError } = require('staycar-errors')

module.exports = (id, parkingName) => {
    validate.string(id, 'id')
    validate.string(parkingName, 'parkingName')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            //return user.save()
            return Parking.findOne({parkingName})
                .lean()
                .then(parking => {
                
                    if (!parking) throw new NotFoundError(`parking with name ${parkingName} does not exist`)
                
                    //return parking[0]._id
                    parking.id = parking._id.toString()

                    delete parking._id 

                    //return parking.id
                    return parking
                })  
        })
}