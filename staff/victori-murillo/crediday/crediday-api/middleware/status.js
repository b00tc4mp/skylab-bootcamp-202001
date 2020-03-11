module.exports = (req, res, next) => {
  const {method, path} = req
  let status = 200

  if (method === 'POST' && path === '/companies') status = 201
  if (method === 'POST' && path === '/users') status = 201

  res.status(status)

  next()
}