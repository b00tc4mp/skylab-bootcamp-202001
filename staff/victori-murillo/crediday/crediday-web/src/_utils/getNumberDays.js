const getNumberDays = (dateQuery, sundays) => {

  let dayMilliseconds = 1000 * 60 * 60 * 24;

  let fromDate = new Date(dateQuery+ "T00:00:01")
  fromDate = new Date(+fromDate + dayMilliseconds)

  let toDate = new Date();

  let countOfDay = 0;

  let date1 = fromDate;
  let date2 = toDate;

  while (date1 <= date2) {
    if (date1.getDay() !== 0) {
      countOfDay++;
    }

    if (sundays && date1.getDay() === 0) {
      countOfDay++;
    }
    
    date1 = new Date(+date1 + dayMilliseconds);
  }

  return countOfDay
}

export default getNumberDays;