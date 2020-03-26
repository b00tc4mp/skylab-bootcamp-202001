const { validate } = require('pet-care-utils')
const { models: { Pet, User }, ObjectId } = require('pet-care-data')
const { NotFoundError } = require('pet-care-errors')

module.exports = (idAppointment, idPet, id) => {

    validate.string(id, 'id')
    validate.string(idAppointment, 'appointment')
    validate.string(idPet, 'idPet')

    return (async()=>{

    const user = await User.findById(id)
    if (!user) throw new NotFoundError(`user with id ${id} not found`)
    
    const pet = await Pet.findById(idPet)
    
    if(!pet) throw new NotFoundError(`pet with id ${idPet} not found`)

    await Pet.updateOne({_id: ObjectId(idPet)}, {$pull: {appointments: {_id: ObjectId(idAppointment)}}})

    })()
}

