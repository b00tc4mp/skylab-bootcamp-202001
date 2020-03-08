const changeAmount = (amount) => {

  let newAmount = amount
    // newAmount = newAmount.split('').filter(n => n !== ".").filter(n => n >= 0)
    newAmount = newAmount.split('').filter(n => n >= 0)

    newAmount = newAmount.map((char, index, arr) => {
      const leng = arr.length

      return ( 
        ( leng >= 4 && (index === (leng - 4)) ) || ( leng >= 7 && (index === (leng - 7))) || (leng >= 10 && (index === (leng - 10)) )  
      ) ? char + "." : char
    }).join('')

    return newAmount
}

module.exports = changeAmount;