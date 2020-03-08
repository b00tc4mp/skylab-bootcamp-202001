const removePoints = string => {
  let newString = string.toString()

  newString = newString.split('').filter(char => char !== ".").join('')
  const number = parseInt(newString)

  return number
}

module.exports = removePoints