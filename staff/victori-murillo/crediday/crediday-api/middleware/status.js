module.exports = (req, res, next) => {
  const {method, path} = req
  let status = 200

  console.log('status')
  if (method === 'POST' && path === '/companies') status = 201
  if (method === 'POST' && path === '/users') status = 201
  if (method === 'POST' && path === '/credits/users') status = 201

  console.log(path)

  res.status(status)

  next()
}