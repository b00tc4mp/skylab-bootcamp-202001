const {retrieveSubscribedEvents} = require('../logic')

module.exports = (req, res) => {
  try {
    debugger
    const {payload: {sub: userId}} = req

    retrieveSubscribedEvents(userId)
    .then(({events, user}) => {
      return res
        .status(200)
        .json({
          message: `${user} is suscribed in ${events.length} events`, 
          events
        })
    }) 
    .catch(({message}) => res.status(400).json({error: message}))

  } catch ({message}) {
    res.status(400).json({error: message})
  }
}