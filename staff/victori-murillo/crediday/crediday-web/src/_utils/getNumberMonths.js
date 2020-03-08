const getNumberMonths = (dateQuery) => {

  let dayMilliseconds = 1000 * 60 * 60 * 24;

  let fromDate = new Date(dateQuery+ "T00:00:01")
  fromDate = new Date(+fromDate + dayMilliseconds)

  let dayOfMonth = fromDate.getDate()
  if (dayOfMonth === 31 || dayOfMonth === 30 || dayOfMonth === 29) {
    dayOfMonth = 1
  }
  // Quantity of 28 = 12
  // Quantity of 29 = 11
  // Quantity of 30 = 11
  // Quantity of 31 = 7

  let toDate = new Date();

  let countOfMonths = 0;

  let date1 = fromDate;
  let date2 = toDate;

  while (date1 <= date2) {
    
    var day = date1.getDate();

    if (day === dayOfMonth) {
      countOfMonths++;
    }

    date1 = new Date(+date1 + dayMilliseconds);
  }

  return countOfMonths
}

export default getNumberMonths;