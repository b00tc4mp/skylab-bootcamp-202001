const { retrieveToiletPhoto } = require('../../logic')

module.exports = async (req, res) => {
    const { params: { toiletId } } = req
  
    const stream = await retrieveToiletPhoto(toiletId) 

    res.setHeader('Content-Type', 'image/jpeg')

    return stream.pipe(res)
}