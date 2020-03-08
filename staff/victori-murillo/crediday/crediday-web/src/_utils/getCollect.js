const getLastDays = arrPayments => {
  let dates = arrPayments.map(ele => ele.datePayment).sort()

  let uniqueDates = []

  dates.forEach(ele => {
    if( !uniqueDates.includes(ele) ) {
      uniqueDates.push(ele)
    }
  })

  return uniqueDates
}


const getCollects = arrPayments => {
  const collects = {}

  getLastDays(arrPayments).forEach(date => {

    collects[date] = arrPayments.map(ele => {

      if (ele.datePayment === date) {
        return ele.amountPayment
      }
      return undefined

    })
    // .sort()
    .filter(ele => typeof ele !== "undefined")
    .reduce((accum, curr) => accum + curr)

  })

  return collects
}


module.exports = {getLastDays, getCollects}