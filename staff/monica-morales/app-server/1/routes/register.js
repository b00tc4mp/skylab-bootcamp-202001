
module.exports=({ session: { acceptCookies } }, res) => {
    // res.send(App({ title: 'Register', body: Register(), acceptCookies }))
    res.render('register', {acceptCookies})
}