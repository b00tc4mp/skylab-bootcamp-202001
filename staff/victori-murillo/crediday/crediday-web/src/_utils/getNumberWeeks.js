const getNumberWeeks = (dateQuery, dateCancelled) => {

  let dayMilliseconds = 1000 * 60 * 60 * 24;

  let fromDate = new Date(dateQuery) // Here new Date make a date one day before.

  fromDate = new Date(+fromDate + dayMilliseconds+ (dayMilliseconds /4)  ) // This create a date one day after.

  let dayOfWeek = fromDate.getDay()

  let toDate = new Date();

  let countOfDay = 0;

  let date1 = fromDate;

  let date2 = toDate;
  
  if (dateCancelled) { // if someone send me a dateCancelled
    let untilDate = new Date(dateCancelled)
    untilDate = new Date(+untilDate + dayMilliseconds)
    date2 = untilDate
  }

  while (date1 <= date2) {
    // console.log(date1, date2)
    
    var day = date1.getDay();

    if (day === dayOfWeek) {
      countOfDay++;
    }

    date1 = new Date(+date1 + dayMilliseconds);
    
  }

  return countOfDay
}

export default getNumberWeeks;