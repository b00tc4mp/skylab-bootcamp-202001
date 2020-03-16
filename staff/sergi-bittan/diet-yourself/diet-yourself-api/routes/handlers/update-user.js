const { updateUser } = require("../../logic")
const { NotAllowedError, ContentError } = require("diet-yourself-errors")

module.exports = (req, res) => {
    const { payload: { sub: id }} = req
  
    const { query: { username, age, weight, height, goal, activity, city, finalWeight } } = req
   
    try{
        debugger
        let update = {username, age, weight, height, goal, activity, city, finalWeight}
       debugger
        updateUser(id, update)
            .then(() => res.status(201).end())
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 409

                const { message } = error

                res
                    .status(status)
                    .json({
                        error: message
                    })
                })
    } catch (error) {
        let status = 400

        if (error instanceof TypeError || error instanceof ContentError)
            status = 406 

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}