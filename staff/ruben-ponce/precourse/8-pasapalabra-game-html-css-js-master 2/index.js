'use strict'
var QUESTIONS = [
    [
        {letter: "a", answer:"array", status: 0, question: "CON LA A. Matriz utilizada para almacenar varios valores en una sola variable."},
        {letter: "a", answer:"anonima", status: 0, question: "CON LA A. En español; función la cual no tiene nombre."},
        {letter: "a", answer:"alert()", status: 0, question: "CON LA A. Incluye signos; método que muestra un cuadro con un mensaje especificado y un botón aceptar."}
    ],
    [
        {letter: "b", answer:"bucle", status: 0, question: "CON LA B. Se utiliza para la repetición de una o varias acciones un determinado número de veces, y debes comprenderlo correctamente ante la prueba de acceso a Skylab."},
        {letter: "b", answer:"number", status: 0, question: "CONTIENE LA B. Que devuelve la consola: console.log(typeof(0.0))."},
        {letter: "b", answer:"boolean", status: 0, question: "CON LA B. Tipo de dato que representa a true o false."}
    ],
    [    
        {letter: "c", answer:"const", status: 0, question: "CON LA C. Declaración de una variable, la cual no permite cambiar el valor primitivo, pero si las propiedades del objeto."},
        {letter: "c", answer:"condicion", status: 0, question: "CON LA C. En español; a menudo las sentencias van acompañadas de ellas para tomar una u otra/s acción/es."},
        {letter: "c", answer:"confirm()", status: 0, question: "CON LA C. Incluye signos; método que muestra un cuadro con un mensaje especificado con un boton para aceptar y otro para cancelar."}
    ],
    [
        {letter: "d", answer:"new date()", status: 0, question: "CON LA D. Incluye signos; objeto utilizado con el que se consigue obtener la fecha y hora."},
        {letter: "d", answer:"delete", status: 0, question: "CON LA D. Palabra clave utilizada para eliminar una propiedad de un objeto."},
        {letter: "d", answer:"default", status: 0, question: "CON LA D. Palabra clave, que en una sentencia switch establece que se ejecute si no se cumple ninguna de las anteriores condiciones."}
    ],
    [
        {letter: "e", answer:"ecmascript", status: 0, question: "CON LA E. Nombre que se da al estándar aplicado a JS en 1997 por la European Computer Manufacturers Association."},
        {letter: "e", answer:"else", status: 0, question: "CON LA E. Sentencia condicional en la que se ejecutará el código en caso de que la condición sea falsa."},
        {letter: "e", answer:"let", status: 0, question: "CONTIENE LA E. Palabra clave de ambito local para declarar una variable."}
    ],
    [
        {letter: "f", answer:"function", status: 0, question: "CON LA F. Bloque de código con la finalidad de realizar una tarea en particular."},
        {letter: "f", answer:"parsefloat()", status: 0, question: "CONTIENE LA F. Incluye signos; función que devuelve un numero a partir de una cadena de carácteres."},
        {letter: "f", answer:"for", status: 0, question: "CON LA F. Primera palabra clave de la sintaxis de un bucle que se repetirá un numero de veces."}
    ],
    [
        {letter: "g", answer:"string", status: 0, question: "CONTIENE LA G. Objeto que representa una serie de carácteres dentro de una cadena."},
        {letter: "g", answer:"debugger", status: 0, question: "CONTIENE LA G. Palabra clave que interrumpe la ejecución para su depuración."},
        {letter: "g", answer:"console.log()", status: 0, question: "CONTIENE LA G. Incluye signos; método utilizado para la impresión en consola."}
    ],
    [
        {letter: "h", answer:"unshift()", status: 0, question: "CONTIENE LA H. Incluye signos; método que añade un elemento al principio del array."},
        {letter: "h", answer:"hasownproperty()", status: 0, question: "CON LA H. Incluye signos; método que devuelve un boolean indicando si el objeto contiene la propiedad especificada."},
        {letter: "h", answer:"innerhtml", status: 0, question: "CONTIENE LA H. Propiedad utilizada para insertar contenido en el DOM del HTML."}
    ],
    [
        {letter: "i", answer:"parseint()", status: 0, question: "CONTIENE LA I. Incluye signos; función que convierte una cadena y la devuelve en un número entero."},
        {letter: "i", answer:"isnan()", status: 0, question: "CON LA I. Incluye signos; función que devuelve un booleano al comprobar si el valor especificado es un número."},
        {letter: "i", answer:"if", status: 0, question: "CON LA I. Primera sentencia condicional la cual se ejecutará el código si la condición es verdadera."}
    ],
    [
        {letter: "j", answer:"json", status: 0, question: "CON LA J. Formato evaluado como objeto y utilizado para el envío de datos entre web y servidor."},
        {letter: "j", answer:"object", status: 0, question: "CONTIENE LA J. Variable que contiene propiedades y valores."},
        {letter: "j", answer:"javascript", status: 0, question: "CON LA J. Lenguaje de programación orientado a objetos, dinamico y con tipado débil, cuya extensión del archivo correspone a .js."}

    ],
    [
        {letter: "k", answer:"keys()", status: 0, question: "CON LA K. Incluye signos; método para que devuelva un array de las propiedades name del objeto."},
        {letter: "k", answer:"break", status: 0, question: "CONTIENE LA K. Utilizado para saltar una declaración del bucle."},
        {letter: "k", answer:"onclick", status: 0, question: "CONTIENE LA K. Nombre del evento que lanzará una función al dar click sobre el elemento."}
    ],
    [
        {letter: "l", answer:"length", status: 0, question: "CON LA L. Propiedad que devuelve el número de carácteres/ítems de un string/array."},
        {letter: "l", answer:"includes()", status: 0, question: "CONTIENE LA L. Incluye signos; método que devuelve un booleano al comprobar si el array contiene el elemento especificado."},
        {letter: "l", answer:"ceil()", status: 0, question: "CONTIENE LA L. Incluye signos; método que devuelve un número entero redondeado hacia arriba."}
    ],
    [
        {letter: "m", answer:"math()", status: 0, question: "CON LA M. Incluye signos; objeto que permite realizar tareas matemáticas."},
        {letter: "m", answer:"map()", status: 0, question: "CON LA M. Incluye signos; método que creará un array con los resultados de la función realizada por cada elemento del array."},
        {letter: "m", answer:"trim()", status: 0, question: "CONTIENE LA M. Incluye signos; método que eliminará los espacios en blanco de mas en un string."}
    ],
    [
        {letter: "n", answer:"nan", status: 0, question: "CON LA N. Propiedad que representa cuando un valor no es un número."},
        {letter: "n", answer:"join()", status: 0, question: "CONTIENE LA N. Incluye signos; método que devuelve un string a partir de un array, con sus elementos separados con el/los carácteres especificados."},
        {letter: "n", answer:"continue", status: 0, question: "CONTIENE LA N. Sentencia que rompe la iteración de un bucle si se produce la condición y continua con la siguiente iteración del bucle."}
    ],
    [
        {letter: "ñ", answer:"año", status: 0, question: "CONTIENE LA Ñ. En español; que devuelve el método new Date().getFullYear()?."},
        {letter: "ñ", answer:"caña", status: 0, question: "CONTIENE LA Ñ. En español; tallo de la planta hueco o medida de vaso alta y estrecha."},
        {letter: "ñ", answer:"castaña", status: 0, question: "CONTIENE LA Ñ. En español; coloquial de borrachera, golpe, bofetada, trompazo..."}
    ],
    [
        {letter: "o", answer:"pop()", status: 0, question: "CONTIENE LA O. Incluye signos; método que elimina el último elemento de un array."},
        {letter: "o", answer:"floor()", status: 0, question: "CONTIENE LA O. Incluye signos; método que redondea hacia abajo y devuelve un número entero."},
        {letter: "o", answer:"concat()", status: 0, question: "CONTIENE LA O. Incluye signos; método utilizado para unir dos o mas stings o arrays."}
    ],
    [
        {letter: "p", answer:"push()", status: 0, question: "CON LA P. Incluye signos; método que añade un nuevo elemento al array"},
        {letter: "p", answer:"pi", status: 0, question: "CON LA P. Nombre que se le da a dicho valor o propiedad de Math. que devuelve la relación entre la longitud de una circumferencia y su diametro. Aprox. 3'14."},
        {letter: "p", answer:"prompt()", status: 0, question: "CON LA P. Incluye signos; método que muestra un cuadro de dialogo y solicita una entrada de carácteres."}
    ],
    [
        {letter: "q", answer:"sqrt()", status: 0, question: "CONTIENE LA Q. Incluye signos; método del objeto Math() que devuelve la raíz cuadrada."},
        {letter: "q", answer:"queryselector()", status: 0, question: "CON LA Q. Incluye signos; método que mediante jquery selecciona el primer elemento en el documento CSS."},
        {letter: "q", answer:"jquery", status: 0, question: "CONTIENE LA Q. Librería de JS que simplifica la forma de interactuar con los documentos HTML, el DOM, eventos, animaciones y AJAX."}
    ],
    [
        {letter: "r", answer:"return", status: 0, question: "CON LA R. Sentencia para finalizar la ejecución de la función y especificar un valor para ser devuelto a quien llama a la función."},
        {letter: "r", answer:"random()", status: 0, question: "CON LA R. Incluye signos; método del objeto Math. que devuelve un número aleatorio entre 0 y 1."},
        {letter: "r", answer:"charAt()", status: 0, question: "CONTIENE LA R. Incluye signos; método que devuelve mediante el índice especificado el carácter de una cadena ."}
    ],
    [
        {letter: "s", answer:"sort()", status: 0, question: "CON LA S. Incluye signos; método para ordenar un array por orden alfabetico."},
        {letter: "s", answer:"isinteger()", status: 0, question: "CONTIENE LA S. Incluye signos; método que evalua y devuelve un booleano si en valor es un número entero."},
        {letter: "s", answer:"search()", status: 0, question: "CON LA S. Incluye signos; método de búsqueda en un string de un valor especificado y este devuelve su posicion, en caso de no encontrarlo devuelve -1."}
    ],
    [
        {letter: "t", answer:"this", status: 0, question: "CON LA T. Palabra clave que se refiere al objeto al que pertenece."},
        {letter: "t", answer:"tostring()", status: 0, question: "CON LA T. Incluye signos; método que devuelve un string separado por comas a partir de un array."},
        {letter: "t", answer:"write()", status: 0, question: "CONTIENE LA T. Incuye signos; método utilizado en document. para escribir texo directamente al documento HTML."}
    ],
    [
        {letter: "u", answer:"undefined", status: 0, question: "CON LA U. Valor devuelto de una variable no definida."},
        {letter: "u", answer:"url", status: 0, question: "CON LA U. Siglas de la dirección que combina un protocolo de comunicación, un anfitrión, un número de puerto, una ruta del recurso y opcionalmente una cadena de búsqueda."},
        {letter: "u", answer:"round()", status: 0, question: "CONTIENE LA U. Incluye signos; método del objeto Math. para redondear al entero más cercano."}
    ],
    [
        {letter: "v", answer:"values()", status: 0, question: "CON LA V. Incluye signos; anexo al método Object. para que devuelva un array con los valores de las propiedades enumerables de un objeto."},
        {letter: "v", answer:"var", status: 0, question: "CON LA V. Sentencia que declara una variable."},
        {letter: "v", answer:"reverse()", status: 0, question: "CONTIENE LA V. Incluye signos; método que invierte el orden de un array."}
    ],
    [
        {letter: "w", answer:"while", status: 0, question: "CON LA W. Bucle que mientras se cumple la condición se ejecutará."},
        {letter: "w", answer:"switch", status: 0, question: 'CONTIENE LA W. Declaración que evalua una expresión comparando el valor de esta con instancias "case".'},
        {letter: "w", answer:"tolowercase()", status: 0, question: "CONTIENE LA W. Incluye signos; método que convierte un string a minúsculas"}  
    ],
    [
        {letter: "x", answer:"indexof()", status: 0, question: "CONTIENE LA X. Incluye signos; método que devuelve el indice de la primera aparición del elemento indicado del string o array"},
        {letter: "x", answer:"max()", status: 0, question: "CONTIENE LA X. Incluye signos; método del objeto Math. que devuelve el número de mayor valor."},
        {letter: "x", answer:"lastindexof()", status: 0, question: "CONTIENE LA X. Incluye signos; método que de un array devuelve el índice de la última posicion del elemento especificado."}
    ],
    [
        {letter: "y", answer:"typeof", status: 0, question: "CONTIENE LA Y. Operador que devuelve el tipo de dato que contiene una variable."},
        {letter: "y", answer:"getfullyear()", status: 0, question: "CONTIENE LA Y. Incluye signos; método que devuelve el año."},
        {letter: "y", answer:"isarray()", status: 0, question: "CONTIENE LA Y. Incluye signos; método que devuelve un boolean al comprobar si es un array."}

    ],
    [
       {letter: "z", answer:"zombie", status: 0, question: "CON LA Z. Estado en el que se encuentra uno tras muchas horas frente a la pantalla, también conocido como caminante en la serie the walking dead."},
       {letter: "z", answer:"raiz", status: 0, question: "CONTIENE LA Z. En español; en sistemas Unix, se le conoce como la carpeta principal con símbolo /."},
       {letter: "z", answer:"diez", status: 0, question: 'CONTIENE LA Z. En español; cual es el nombre del resultado de a: var a = [0, 1].reverse().join("").'}
    ]
];
var ASIGNANOMBRE = true;
var ACIERTOS = 0;
var FALLOS = 0;
var NEXT = 0;
var QUESTIONSORTED = [];
var RANKING = [];
var NOMBRE = "";
var RESPUESTA = "";
var startB = document.getElementsByClassName("start")[0];
var pasapalabraB = document.getElementsByClassName("pasapalabra")[0];
var stopB = document.getElementsByClassName("stop")[0];
var text = document.getElementsByClassName("text")[0];
var button = document.getElementById("send");
var resp = document.getElementById("resp");
var content = document.getElementsByClassName("contentD")[0];
var letter = document.getElementsByClassName("letter");
var success = document.getElementsByClassName("successes")[0];
var timer = document.getElementsByClassName("timer")[0];
var image = document.getElementsByClassName("contentA")[0];
var a = "";
var b = "";
var round = 3;
var play;
var listen = false;

var sortQuestions = () => {
  for (var j = 0; j < 27; j++){
    let b = Math.floor(Math.random() * (3 - 0));
    QUESTIONSORTED.push(QUESTIONS[j][b]);
    QUESTIONSORTED[j]["status"] = 0;
  };
  return pasapalabra();
}


var t = 300;
var interval;
var startTime = () => interval = setInterval(myTimer, 1000);
var myTimer = () => {
  timer.innerHTML = t--;
  if (t === -1) {
    stopInterval();
    return stop();
  };
}

var stopInterval = () => clearInterval(interval);

var start = () => {
  listen = true;
  startB.onclick = "";
  pasapalabraB.onclick = function(){next()};
  stopB.onclick = function(){stop()};
  NOMBRE = resp.value;
  resp.value = "";
  resp.placeholder = "Respuesta";
  document.getElementById("send").style.visibility = "visible";
  startTime();  
  return sortQuestions();
}

var pasapalabra = () => {
  for (var i = 0; i < QUESTIONSORTED.length; i++) {
    if (QUESTIONSORTED[i]["status"] === 0) {
      b = i;  
      return text.innerHTML = (QUESTIONSORTED[i]["question"]);
    } else if (QUESTIONSORTED[i]["status"] === round) {
      b = i;  
      return text.innerHTML = (QUESTIONSORTED[i]["question"]);
    } else {
        if (ACIERTOS === 27) {
          return finish("win");
        } else if (ACIERTOS + FALLOS === 27) {
          return finish("lose");
        };
    };
  };
  round += 1;
  return pasapalabra();
}

var send = () => {
  a = resp.value;
  resp.value = "";
  console.log(a);
  if (a === null || a.toLowerCase() === "end") return finish("lose");
  else if (a.toLowerCase() === "pasapalabra") {
    if (QUESTIONSORTED[b]["status"] === 0) QUESTIONSORTED[b]["status"] = (round + 1);
    else if (QUESTIONSORTED[b]["status"] = round) QUESTIONSORTED[b]["status"] = (round + 1);
    NEXT += 1;
    letter[b].style.backgroundImage = "radial-gradient(at left, #99a529, #ecff08";
    console.log("Siguiente pregunta:");
  } else if (a.toLowerCase() === QUESTIONSORTED[b]["answer"]) {
      QUESTIONSORTED[b]["status"] = 1;
      console.log("Correcto");
      ACIERTOS += 1;
      letter[b].style.backgroundImage = "radial-gradient(at left, #29a52c, #1fff08";
      success.innerHTML = ACIERTOS;
      if ((ACIERTOS + FALLOS) === 27) return finish("win");
  } else {
      QUESTIONSORTED[b]["status"] = 2;
      FALLOS += 1;
      letter[b].style.backgroundImage = "radial-gradient(at left, #a52929, #ff0808";
      console.log("Incorrecto");
      /*finish("lose");*/  /* <-- Para finalizar al fallar */
  };
  return pasapalabra();
}

var next = () => {
  resp.value = "pasapalabra";
  return send();
}

var stop = () => {
  resp.value = "end";
  return send();
}

var resetValues = () => {
  for (var k = 0; k < QUESTIONSORTED.length; k++) {
    letter[k].style.backgroundImage = "radial-gradient(at left, #293ca5, #4d62d8)";
  };
  ASIGNANOMBRE = true;
  ACIERTOS = 0;
  FALLOS = 0;
  NEXT = 0;
  QUESTIONSORTED = [];
  NOMBRE = "";
  RESPUESTA = "";
  a = "";
  b = "";
  round = 3;
  image.style.backgroundImage = "url(/img/skylab.jpg)";
  image.style.margin = "4vw auto";
  text.innerHTML = "Bienvenido al Pasapalabra.<br> Las respuestas deberán ser en singular, sin acentos, sin signos y en inglés a excepción de que se especifique.<br>-F11 para pantalla completa<br>-Introduce tu nombre y pulsa play para comenzar.<br>-Enter/Botón enviar para responder, y ctrl/botón siguiente para pasapalabra.</p>"
  text.style.margin = "0vw 1vw";
  content.style.visibility = "visible";
  startB.onclick = function(){start()};
  pasapalabraB.onclick = "";
  stopB.onclick = "";
  t = 300;
  return stopInterval();
}

var preguntaNuevoJuego = () => {
  setTimeout(function(){ 
    play = confirm("Quieres volver a jugar?")
    if (play) {
        listen = false;
        return resetValues();
    } else if (!play) {
        pasapalabraB.onclick = "";
        stopB.onclick = "";
        text.innerHTML = "Hasta la próxima.";
        listen = false;
        return stopInterval();
    };
  },1000);
}

var finish = z => {
    if (z === "win") image.style.backgroundImage = "url(/img/pato-graduado.png)";
    else if (z === "lose") {
      image.style.backgroundImage = "url(/img/pato-triste.jpg)";
      image.style.marginRight = "33vw";
    };
    RANKING.push({NOMBRE:NOMBRE, ACIERTOS:ACIERTOS, FALLOS:FALLOS});
    button.style.visibility = "hidden";
    content.style.visibility = "hidden";
    text.style.margin = "0vw 18vw";
    var porAciertos = RANKING.slice(0);
    porAciertos.sort(function(a,b) {
        return b.ACIERTOS - a.ACIERTOS;
    });
    text.innerHTML = " \\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\ RANKING: /-/-/-/-/-/-/-/-/-/-/-/ " + "<br>";
    for (var j = 0; j < porAciertos.length; j++) {
      text.innerHTML += ("--- " + (j+1) + ". --- Nombre: " + porAciertos[j].NOMBRE + " --- Aciertos: " + porAciertos[j].ACIERTOS + " --- Fallos: " + porAciertos[j].FALLOS) + " --- " + "<br>";
    }
    preguntaNuevoJuego();
}

window.addEventListener("keydown", function(event) {
  if (listen) {
  switch (event.keyCode) {
    case 13:
      return send();
    case 17:
      return next();
  }
}
},false);