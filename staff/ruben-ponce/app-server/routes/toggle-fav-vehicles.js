const { toggleFavVehicle } = require('../logic')

module.exports = (req, res) => {
    const { params: { id}  ,session: { token, acceptCookies }} = req
    toggleFavVehicle(id, token, (error) => {
        res.redirect(req.get('referer'))
    })
}