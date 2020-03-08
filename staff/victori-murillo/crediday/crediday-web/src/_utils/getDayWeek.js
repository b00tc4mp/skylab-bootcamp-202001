const getDayWeek = (dateQuery = null) => {

  let dayMilliseconds = 1000 * 60 * 60 * 24;
  let d

  if (dateQuery) {
    d = new Date(dateQuery)
    d = new Date(+d + dayMilliseconds/4)
    
  } else {
    d = new Date()
    d = new Date(+d)
  }

  var days = ['Domingo', 'Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Deciembre'];

  var day = days[ d.getDay() ];
  var month = months[ d.getMonth() ];

  return {day, month}
}


export default getDayWeek


