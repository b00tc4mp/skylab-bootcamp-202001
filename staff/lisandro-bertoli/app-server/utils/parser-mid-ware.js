function parserMidWare(req, res, next) {
    let data = ''

    req.on('data', chunk => {
        data += chunk
    })

    const body = {}

    req.on('end', () => {
        const fields = data.split('&')

        fields.forEach(field => {
            const key = field.split('=')[0]
            const value = field.split('=')[1]

            body[key] = value
        })
    })

    req.body = body

    next()
}

module.exports = parserMidWare