const { App, Landing } = require('../components')

module.exports = ({ session: { acceptCookies } }, res) => {
    res.send(App({ title: 'My App', body: Landing(), acceptCookies }))
}