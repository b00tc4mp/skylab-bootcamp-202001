const {retrievePublishedEvents} = require("../logic")

module.exports = (req, res) => {

  try {
    const {payload: {sub: id}} = req

    retrievePublishedEvents(id)
    .then(({events, user}) => {
      // if (!events.length) return res.status(404).end()
      res.status(200).json({message: `Published Events by ${user}`, events})
    })
    .catch(({message}) => res.status(400).json({error: message}))
    
  } catch (error) {
    
  }
}