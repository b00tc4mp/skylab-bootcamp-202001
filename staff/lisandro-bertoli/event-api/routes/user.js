const { Router } = require('express')
const router = Router()
const asycHandler = require('../handlers/async-handler')

module.exports = router
    .post('/', asycHandler(async (req, res, next) => {
        await registerUser(req.body)

    }))
