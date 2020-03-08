import getDateToday from './getDateToday'

const getMonthsFromPays = (pays) => {

  //Filter the Year
  // const pays = payments.filter(c => c.datePayment.slice(0,4) === year)

  let months = pays.map(c => {
    const monthsActive = getDateToday(c.datePayment).slice(5, 7)
    return monthsActive
  }
  //Filtering only 1 month in the whole List
  ).filter((c, i, a) => a.indexOf(c) === i)

  //Order Months - from largest to smallest 
  months = months.sort((a, b) => (a > b) ? -1 : 1)

  return months
}

export default getMonthsFromPays;