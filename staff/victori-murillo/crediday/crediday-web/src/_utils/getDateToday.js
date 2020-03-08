const getDateToday = (dateQuery) => {
  let date;
  let dayMilliseconds = 1000 * 60 * 60 * 24;

  if (dateQuery) {
    date = new Date(dateQuery)
    date = new Date(+date + dayMilliseconds/4)

  } else {
    date = new Date()
  }

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  var today = year + "-" + month + "-" + day;   

  // console.log(today)
  return today
}

export default getDateToday;

