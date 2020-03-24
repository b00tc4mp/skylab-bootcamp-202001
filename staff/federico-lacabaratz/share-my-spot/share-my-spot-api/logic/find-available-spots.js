const { validate } = require('share-my-spot-utils')
const { models: { Spot } } = require('share-my-spot-data')

module.exports = (filter = {}) => {
    let { addressLocation, length, height, width, price, acceptsBarker } = filter
    let _filter = {  status: 'available' }
    
    
    if (typeof addressLocation !== 'undefined') {
        validate.string(addressLocation, 'location')
        _filter.addressLocation = { $regex: addressLocation }
    }
    
    if (typeof length !== 'undefined') {
        length = Number(length)
        validate.type(length, 'length', Number)
        _filter.length = { $gte: length }
    }
    
    if (typeof height !== 'undefined') {
        height = Number(height)
        validate.type(height, 'height', Number)
        _filter.height = { $gte: height }
    }
    
    if (typeof width !== 'undefined') {
        width = Number(width)
        validate.type(width, 'width', Number)
        _filter.width = { $gte: width }
    }

    if (typeof price !== 'undefined') {
        price = Number(price)
        validate.type(price, 'price', Number)
        _filter.price = { $lte: price }
    }

    if (typeof acceptsBarker !== 'undefined') {
        acceptsBarker === 'yes' ? acceptsBarker = true : acceptsBarker = false
        validate.type(acceptsBarker, 'acceptsBarker', Boolean)
        _filter.acceptsBarker = acceptsBarker
    }
    
    return Spot.find(_filter).populate("publisherId", "name surname email phone").sort({ created: -1 })
        .then(spots => {
            return spots
        })
}