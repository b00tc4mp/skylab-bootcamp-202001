// module.exports = fn => (req, res, next) =>
//   Promise
//     .resolve(fn(req, res, next))
//     .catch(next)

module.exports = (fn) => {
  return (req, res, next) =>
    Promise
      .resolve(fn(req, res, next))
      .catch((error) => next(error))
}
/*
    Where did I learn?
    http://www.acuriousanimal.com/blog/2018/03/15/express-async-middleware
*/