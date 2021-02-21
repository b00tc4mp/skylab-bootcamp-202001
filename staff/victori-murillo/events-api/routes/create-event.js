const {createEvent} = require('../logic')
const { ContentError } = require('events-errors')

module.exports = (req, res) => {

  try {
    const { payload: {sub}, body: {title, description, location, date} } = req

    createEvent( sub, title, description, location, new Date(date) )
    .then(() => res.status(201).end())
    .catch(({message}) => res.status(400).json({error:message}))

  } catch (error) {
    let status = 400

    if (error instanceof ContentError || error instanceof TypeError)
      status = 406 // not acceptable

    res.status(status).json({error: error.message})
  }
}