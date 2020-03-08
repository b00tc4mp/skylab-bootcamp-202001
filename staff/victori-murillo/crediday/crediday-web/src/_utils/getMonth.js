const getMonth = (dateQuery, monthInWord) => {

  let dayMilliseconds = 1000 * 60 * 60 * 24;
  
  let d = new Date(dateQuery)

  d = new Date(+d + dayMilliseconds/4)


  if (monthInWord) {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    return months[d.getMonth()]
  }

  return d.getMonth()
}

// console.log(getMonth('2019-10-07', true))

export default getMonth