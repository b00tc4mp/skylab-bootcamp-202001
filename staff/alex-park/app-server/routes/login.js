module.exports = (req, res) => {
    const { session: { acceptCookies } } = req

    res.render('login', acceptCookies)
}