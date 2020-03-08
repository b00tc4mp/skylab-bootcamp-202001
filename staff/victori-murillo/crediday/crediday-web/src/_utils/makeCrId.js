const makeCrId = (id) => {

  const betterValue = id.split('').map((letter, i, array) => {

    if ( letter >= 0 || (letter === "-" && (i === 1 || i === 6) )     ) {
      if ( i === 1 && array.length === 2 && letter !== "-") {
        return "-" + letter 

    } else if ( i === 6 && array.length === 7 && letter !== "-" ) {
      return "-" + letter 
    }
    return letter
  }

  return ""
    
  }).join('')

  return betterValue
}

module.exports = makeCrId