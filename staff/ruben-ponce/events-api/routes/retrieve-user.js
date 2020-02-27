const { retrieveUser } = require('../logic')
const atob = require('atob')

module.exports = (req, res) => {
    
    const  { headers: {authorization} } = req
    const [, payload] = authorization.split('.')
    const sub = JSON.parse(atob(payload))
    req.sub = sub.sub

    try{
        retrieveUser(req.sub)
            .then(user => res.status(200).json(user))
    }catch ({message}){
        res.status(401).json({error:message})
    }

}