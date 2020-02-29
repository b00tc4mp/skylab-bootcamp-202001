
const { database } = require('../data')

module.exports = () => {

    const events = database.collection('events')


    const cursor = events.find().sort({created: -1});
    let eventsArray = []
    return (function getNextEvent() {      
        return cursor
            .hasNext()
            .then(hasNext => hasNext && cursor.next())
            .then(result => result && eventsArray.length < 10 && eventsArray.push(result) && getNextEvent())
            .then(()=> eventsArray)
    })()
       

    
    
}