const {validate} = require('events-utils')
const { models: { User, Event } } = require('events-data')

module.exports = (idEvent => {

    validate.string(idEvent, 'idEvent')
    
    
    return User.updateMany({subscribeEvent: idEvent}, {$pull: {subscribeEvent: idEvent}})
        .then(() =>{
           Event.findByIdAndDelete(idEvent)
        })
        .then(() => { })

    })


// const {validate} = require('events-utils')
// const {database, database:{ObjectId}} = require('events-data')

// module.exports = (idEvent =>{

//     validate.string(idEvent, 'idEvent')

//     const _idEvent = ObjectId(idEvent)

//     const users = database.collection('users')
//     const events = database.collection('events')    

//     return users.updateMany({subscribeEvent: _idEvent}, {$pull: {subscribeEvent: _idEvent}})
//         .then(deleteEvent =>{
//             return events.deleteOne({ _id: _idEvent })
//                 .then(del => {
//                     if(del)
//                         var i =1
//                 })
                
//         })
// })

