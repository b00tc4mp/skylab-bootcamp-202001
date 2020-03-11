const { validate } = require('pill-o-clock-utils')
const { models: { User, Drug, Guideline } } = require('pill-o-clock-data')
const { NotFoundError, NotAllowedError } = require('pill-o-clock-errors')

module.exports = async (id, drugName, time) => { 
    validate.string(drugName, 'drugName')
    validate.type(time, 'time', Number)
   
    let _drugName = drugName

    let user = await User.findById(id).lean()
    let drug = await Drug.findOne({drugName}).lean()

            
    if (!drug) throw new NotFoundError(`drug with name ${_drugName} not found`)
    if (!user) throw new NotFoundError(`user with id ${id} not found`)

    for (let i = 0; i < user.prescription.length; i++) {
        let _idDrug = user.prescription[i].drug.toString()

        const __drug = await Drug.findById(_idDrug).lean()
        
        if (__drug.drugName === drugName) throw new NotAllowedError (`user ${user.name} already have ${drugName} in his prescription`)
              
    } 

    const guideline = new Guideline({created: new Date, prescribed: user._id.toString(), drug: drug._id.toString(), times: [time]})

    const updateUser= await User.findByIdAndUpdate(user._id, { $push: { prescription: guideline } })
    const updateGuideline = await guideline.save()
    
}