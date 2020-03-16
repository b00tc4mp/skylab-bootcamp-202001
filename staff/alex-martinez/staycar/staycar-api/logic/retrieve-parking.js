const { validate } = require('staycar-utils')
const { models: { User, Parking } } = require('staycar-data')
const { NotFoundError } = require('staycar-errors')

module.exports = (id) => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            //return user.save()
            return Parking.find()
                .lean()
                .then(parkings => {
                    debugger
                
                    if (!parkings) throw new NotFoundError(`There are no parkings yet`)
                
                    parkings.forEach(pk => {
                        
                        pk.id = pk._id.toString()

                        delete pk._id
                        delete pk.__v
                        
                    })  
                    return parkings
                  
                })  
        })
}