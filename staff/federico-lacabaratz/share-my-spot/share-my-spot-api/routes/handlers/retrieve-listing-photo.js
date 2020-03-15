const express = require('express')
const fs = require('fs')
const { retrieveListingPhoto } = require('../../logic')

module.exports = async (req, res) => {
    const { params: { listingId } } = req
  
    const stream = await retrieveListingPhoto(listingId) 

    res.setHeader('Content-Type', 'image/jpeg')

    return stream.pipe(res)

}