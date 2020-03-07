module.exports = (err, req, res, next) => {

  let { message, name } = err

  // console.log(err.name);
  // if (err.name === "TypeError") {
  //   message = 
  // }

  console.log(err);

  if (name === 'ValidationError') {
    message = Object.values(err.errors).map(value => value.message).join('. ')
  }

  res.status(400).json({ error: message })
}