module.exports = (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    // res.set('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

    next()
}