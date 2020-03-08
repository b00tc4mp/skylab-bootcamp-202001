const getTwiceMonth = (day1, day2, dateQuery) => {

  // console.log(dateQuery)

  let dayMilliseconds = 1000 * 60 * 60 * 24;

  let fromDate = new Date(dateQuery+ "T23:59:59")

  // console.log(fromDate)

  let toDate = new Date();
  // console.log(toDate)

  let countOfDay = 0;

  let date1 = fromDate;
  let date2 = toDate;

  while (date1 <= date2) {
    
    var day = date1.getDate();

    if (day === day1 || day === day2) {
      countOfDay++;
    }

    date1 = new Date(+date1 + dayMilliseconds);
  }
  return countOfDay
}

// console.log(getTwiceMonth(18, 6, "2019-08-20"))

export default getTwiceMonth;