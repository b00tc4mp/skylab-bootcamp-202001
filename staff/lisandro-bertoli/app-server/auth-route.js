const express = require('express')
const router = express.Router()
const parserMidWare = require('./utils/parser-mid-ware')


router.post('/authenticate', function (req, res) {
    router.use(parserMidWare)

    res.send('About birds')
})

module.exports = router