const { models: { Event } } = require('../data')


module.exports = () => {
    const cursor = Event.find().sort({ created: -1 });

    let eventsArray = []

    return (function getNextEvent() {
        return cursor
            .hasNext()
            .then(hasNext => hasNext && cursor.next())
            .then(result => result && eventsArray.length < 10 && eventsArray.push(result) && getNextEvent())
            .then(() => eventsArray)
    })()
}