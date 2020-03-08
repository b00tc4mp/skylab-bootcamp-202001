const getDay = (dateQuery) => {

  let dayMilliseconds = 1000 * 60 * 60 * 24;
  
  let d = new Date(dateQuery)
  d = new Date(+d + dayMilliseconds/4)
  return d.getDay()
}

// console.log(getDay())

export default getDay