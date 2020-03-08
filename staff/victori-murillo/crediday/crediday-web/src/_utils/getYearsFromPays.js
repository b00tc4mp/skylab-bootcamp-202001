import getDateToday from './getDateToday'

const getYearsFromPays = pays => {

  let years = pays.map(c => getDateToday(c.datePayment).slice(0, 4)).filter((c, i, a) => a.indexOf(c) === i)

  // The next statement add the current year, but is not a good idea to do it
  // years.unshift(getDateToday().slice(0, 4))

  years = years.filter((c, i, a) => a.indexOf(c) === i)
  years = years.sort((a, b) => (a > b) ? -1 : 1)

  return years
}

export default getYearsFromPays;