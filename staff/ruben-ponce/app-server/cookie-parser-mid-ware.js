module.exports = (req, res, next) => {
    const { headers: { cookie = ''}} = req
    //wkebhfgiu=wgwegw;wgwg=Wgwgrw

    require.cookies = cookie.split(';').map(keyValue => keyValue.trim()).reduce()
}