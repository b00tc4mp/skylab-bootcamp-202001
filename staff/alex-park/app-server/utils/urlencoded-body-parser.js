module.exports = (req, res, next) => {
    let data = ''

    req.on('data', chunk => {
        data += chunk
    })

    req.on('end', () => {
        data = data.split('&').reduce((accum, keyValue) => {
            const [ key, value ] = decodeURI(keyValue).split('=')
            accum[key] = value
            return accum } , {})
        
        req.body = data
    
        next()
    })
}