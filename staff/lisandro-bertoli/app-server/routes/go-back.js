module.exports = (req, res) => {
    const { session: { query } } = req

    res.redirect(`/search?q=${query}`)
}