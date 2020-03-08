const addPoints = number => {
  let amount;
  
  if (typeof number === "number") {
    amount = number.toString()

  } else if (typeof number === "string") {
    amount = number.split('').filter(char => char !== ".").join('')
  }

  amount = amount.split('').map((num, index, arr) => {

    const leng = arr.length
    
    const firstDot = leng - 4
    const secondDot = leng - 7
    const thirdDot = leng - 10

    if ( (leng >= 4 && index === firstDot) || (leng >= 7 && index === secondDot) || (leng >= 10 && index === thirdDot)) {
      return num + "."

    } else {
      return num
    }

  }).join("")

  // amount = parseInt(amount)

return amount
}

export default addPoints
