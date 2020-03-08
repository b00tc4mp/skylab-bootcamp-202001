const getNumberOf_1_16 = (dateQuery) => {

  let dayMilliseconds = 1000 * 60 * 60 * 24;

  let fromDate = new Date(dateQuery+ "T00:00:01")
  fromDate = new Date(+fromDate + dayMilliseconds)

  // let dayOfMonth = fromDate.getDate()

  let toDate = new Date();

  let countOfDay = 0;

  let date1 = fromDate;
  let date2 = toDate;

  while (date1 <= date2) {
    
    var day = date1.getDate();

    if (day === 1 || day === 16) {
      countOfDay++;
    }

    date1 = new Date(+date1 + dayMilliseconds);
  }
  // if (countOfDay === 0) countOfDay = 1
  return countOfDay
}

export default getNumberOf_1_16;