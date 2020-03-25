const { validate } = require('pill-o-clock-utils')
const { models: { User, Drug, Guideline } } = require('pill-o-clock-data')
const { NotFoundError, NotAllowedError } = require('pill-o-clock-errors')

module.exports = async (id, drugId, time) => {  
    validate.string(id, 'id')
    validate.string(drugId, 'drugId')
    //validate.stringOfNumbers(time)

    let user = await User.findById(id).lean()
    let drug = await Drug.findById(drugId).lean()

    if (!drug) throw new NotFoundError(`drug with name ${drugId} not found`)
    if (!user) throw new NotFoundError(`user with id ${id} not found`)

    for (let i = 0; i < user.prescription.length; i++) {
        if (user.prescription[i].drug.toString() === drugId) throw new NotAllowedError (`user ${user.name} already have ${drug.drugName} in his prescription`)
    } 

    const guideline = new Guideline({created: new Date, prescribed: user._id.toString(), drug: drugId, times: time})

    const updateUser= await User.findByIdAndUpdate(user._id, { $push: { prescription: guideline } })
    const updateGuideline = await guideline.save()   
}