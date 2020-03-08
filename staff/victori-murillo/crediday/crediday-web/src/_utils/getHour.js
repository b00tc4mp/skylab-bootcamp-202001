const getHour = () => {
  var d = new Date();
  let hourNow = d.toString().split(' ')[4]

  return hourNow
}

module.exports = getHour