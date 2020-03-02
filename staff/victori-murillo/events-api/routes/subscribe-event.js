const {subscribeEvent} = require('../logic')

module.exports = (req, res) => {

  try {
    const {payload: {sub: userId}, body: {eventId}} = req

    subscribeEvent(userId, eventId)
    .then(() => res.status(200).json({message: 'User subscribed successfully!'}))
    .catch(({message}) => res.status(400).json({error: message}))
    
  } catch ({message}) {
    res.status(400).json({error: message})
  }
}