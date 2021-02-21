module.exports = (req, res) => {
    const { session: { query }, params: { favorites } } = req
    //TODO going back from detail accesed from favorites should return to favorites and not results
    if (favorites) return res.redirect('/favorites')
    else if (query) return res.redirect(`/search?q=${query}`)

    res.redirect('/')
}