module.exports = (req, res, next) => {
    let data = ''
    req.on('data', chunk => {
        data += chunk
    })
    req.on('end', () => {
        // DO something with body (debug here, analise it, parse it... etc)
        body = {}
            data.split('&').forEach(element => {
                //const [key, value] = element.split('=')
                const key = element.split('=')[0]
                const value = element.split('=')[1]
                body[key]=value
            })
            req.body = body
        

        next()
    })
}