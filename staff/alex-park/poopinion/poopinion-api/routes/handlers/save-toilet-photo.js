const fs = require('fs')
const { saveToiletPhoto } = require('../../logic')
const Busboy = require('busboy')

module.exports = (req, res) => {
    const { payload: { sub: userId }, params: { toiletId } } = req
  
    const busboy = new Busboy({ headers: req.headers })

    busboy.on('file', async (file, filename) => {
        filename = 'toilet01'

        await saveToiletPhoto(userId, toiletId, file, filename)
        
    })

    busboy.on('finish', () => {
        res.end()
    })

    return req.pipe(busboy)
}