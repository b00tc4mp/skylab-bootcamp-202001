const transformWords = (string) => {
  let space = false
    let counter = 0

    let newString = string.split('').map((letter, i) => {

      // if is number return nothing
      if (letter >= 0 && letter !== " ") {
        return ''
      }

      // if is letter -->
      if (letter !== ";" && letter !== "." && letter !== "-") {

        if ( i === 0 )  {
          return letter.toUpperCase();
        } 

        if ( space && (letter !== " ") ) {
          space = false
          counter = 0
          return letter.toUpperCase()
        }
  
        if ( letter === " " && counter === 0) {
          counter = counter + 1
          space = true
          return letter.toLowerCase()
        }
  
        if (counter === 0) {
          return letter.toLowerCase()
        }

      }
      return ''
    }).join('')

    return newString
}

module.exports = transformWords