module.exports = (req, res, next) => {
  const {acceptCookie} = req.cookies
  req.acceptCookie = acceptCookie ? acceptCookie : ''
  next()
}