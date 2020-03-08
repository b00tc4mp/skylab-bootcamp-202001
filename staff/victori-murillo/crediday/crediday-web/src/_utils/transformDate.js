/*
  Three options: small, medium and large.

  - small: 30/Ene/20
  - medium: 30/Enero/2020
  - large: Jueves 30 de Enero, 2020
*/

import getDayWeek from './getDayWeek'

const monthsName = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 
  'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]


const transformDate = (date, formatSize) => {

  let dateTransformed;

  let dateSplit = date.split('-')

  let day = dateSplit[2]
  let monthInNumbers = dateSplit[1]
  let year = dateSplit[0]

  let index_MonthNumber = parseInt(monthInNumbers) - 1;

  let monthInLetters = monthsName[index_MonthNumber]



  if (formatSize === "small") {
    monthInLetters = monthInLetters.slice(0, 3)
    year = year.slice(2, 4)
    dateTransformed = day + "/" + monthInLetters + "/" + year

  } else if (formatSize === "medium") {
    dateTransformed = day + "/" + monthInLetters + "/" + year

  } else if (formatSize === "large") {
    dateTransformed = getDayWeek(date).day + " " + day + " de " + monthInLetters + ", " + year
  }
  
  return dateTransformed
  
}


export default transformDate