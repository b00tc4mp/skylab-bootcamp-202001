const express = require('express')
const fs = require('fs')
const { saveListingPhoto } = require('../../logic')
const Busboy = require('busboy')

module.exports = (req, res) => {
    const { payload: { sub: userId }, params: { listingId } } = req
  
    const busboy = new Busboy({ headers: req.headers })

    busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
        filename = 'garage01'

        await saveListingPhoto(userId, listingId, file, filename)
        
    })

    busboy.on('finish', () => {
        res.end()
    })

    return req.pipe(busboy)

}
