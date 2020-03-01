const {retrieveLastEvents} = require("../logic")

module.exports = (req, res) => {

  try {
    retrieveLastEvents()
    .then(events => {
      if (!events.length) return res.status(200).end()
      res.status(200).json({events})
    })
    .catch(({message}) => res.status(400).json({error: message}))
    
  } catch ({message}) {
    res.status(400).json({error: message})
  }
}