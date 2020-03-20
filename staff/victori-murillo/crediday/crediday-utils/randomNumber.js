/**
 * @param {Number} digits           Return a number with length in digits
 */

module.exports = (digits = 1) => {
  let num = (Math.random() * Math.pow(10, digits) ).toFixed()
  
  while(num.length < digits) {
    num += 0
  }

  return num
}