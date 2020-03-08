const getYears = (dateQuery, untilDate) => {
  let dayMilliseconds = 1000 * 60 * 60 * 24;

  let fromDate = new Date(dateQuery)

  fromDate = new Date(+fromDate + dayMilliseconds/4)

  let toDate = new Date();

  toDate = new Date(+toDate + dayMilliseconds/4)

  console.log(fromDate);
  console.log(toDate);

  if (untilDate) {
    toDate = new Date(untilDate)
    toDate = new Date(+toDate + dayMilliseconds/4)
  }

  let date1 = fromDate;
  let date2 = toDate;

  const years = []
  console.log(years)

  do {
    years.push(date1.getFullYear())
    console.log(date1.getFullYear());
    date1 = new Date(+date1 + dayMilliseconds);

  } while (date1 <= date2)

  //[...new Set(years)] --> filtra a solo un Año 2019, un año 2020, etc
  return [...new Set(years)]
}




const getWeeks = (dateQuery, untilDate) => {
  console.log(dateQuery)

  const years = getYears(dateQuery, untilDate)
  
  console.log(years)

  let dayMilliseconds = 1000 * 60 * 60 * 24;

  let fromDate = new Date(`${years[0]}-01-01`)
  fromDate = new Date(+fromDate + dayMilliseconds/4)

  let toDate = new Date(`${years[years.length - 1]}-12-31`)
  toDate = new Date(+toDate + dayMilliseconds/4)
  

  fromDate = new Date(+fromDate - (dayMilliseconds * 6))
  toDate = new Date(+toDate + (dayMilliseconds * 6))

  let date1 = fromDate;
  let date2 = toDate;

  const weeksInYears = {}
  years.forEach(y => weeksInYears[y]= [])

  let days = []

  while (date1 <= date2) {
    days.push(date1)

    if(date1.getDay() === 0) {
      let yearsIn = days.map(d => d.toString().split(' ')[3])
      yearsIn = yearsIn.filter(y => y === yearsIn[0])

      if (yearsIn.length > 3) {
        if (weeksInYears[days[0].getFullYear()]) {
          weeksInYears[days[0].getFullYear()].push(days)
        }
        

      } else if (weeksInYears[days[days.length - 1].getFullYear()]) {
        weeksInYears[days[days.length - 1].getFullYear()].push(days)
      }
      
      days = []
    }

    date1 = new Date(+date1 + dayMilliseconds);

    
  }
  // console.log(weeksInYears)
  
  return weeksInYears
}

// getWeeks('2018-12-31')

export default getWeeks;