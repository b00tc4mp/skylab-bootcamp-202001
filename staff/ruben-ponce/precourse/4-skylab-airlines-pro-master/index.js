'use strict'
var flights = [
  { id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
  { id: 01, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
  { id: 02, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
  { id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
  { id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
  { id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false },
  { id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
  { id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
  { id: 08, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
  { id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
  { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];

//Bienvenida
var bienvenida = () => {
  var nombre = prompt("Introduzca su nombre de usuario: ");
  console.log("Hola "+ nombre + "!!. " + " Bienvenido a Skylab Airlines. \uD83D\uDE00");
}
bienvenida();

//Impresión de vuelos bajo formato
console.log("Los vuelos disponibles para hoy son:");

var escalas = 0;

for (let index in flights) {
  if (flights[index].scale === true) {
    console.log(" El vuelo con origen: " + flights[index].from + ", y destino: " + flights[index].to + " tiene un coste de " + flights[index].cost + " y realiza escala.");
    escalas++;
  } else {
    console.log(" El vuelo con origen: " + flights[index].from + ", y destino: " + flights[index].to + " tiene un coste de " + flights[index].cost + " y no realiza ninguna escala.");
  };
};

//Coste medio
var costTotal = 0;
var numeroVuelos = flights.length-1;

for (let index in flights) {
  costTotal += flights[index].cost;
};
console.log("El precio medio de nuestros vuelos es de: " + (costTotal/numeroVuelos)+"€.");

//Vuelos que efectuan escalas
console.log("Hoy hay " + escalas + " vuelos que efectúan escalas.");

//Últimos vuelos del día
var destino = "";
for (var i = flights.length-5; i < flights.length; i++) {
  destino += flights[i].to + ", ";
};

//Modificando el string
destino1 = destino.slice([0], destino.length-2) + ".";
var quit = destino1.lastIndexOf(",");
destino2 = destino1.slice([0],quit) + " y" + destino1.slice(quit+1);

console.log("Nuestros últimos 5 vuelos tienen como destino: " + destino2);

//PRO - validación de usuario
var usuario = prompt("Introduzca si es usted ADMIN o USER: ", "user").toUpperCase();

//USER
if (usuario === "USER") {

  var masAlto = param => {
    console.log("Los vuelos con mayor precio a " + param + "€ son:");
    for (let index in flights) {
      if (flights[index].cost > param) {
        console.log(flights[index])
      };
    };
  }

  var masBajo = param => {
    console.log("Los vuelos con menor precio a " + param + "€ son:")
    for (let index in flights) {
      if (flights[index].cost < param) {
        console.log(flights[index])
      };   
    };
  }

  var igualQ = param => {
    console.log("Los vuelos con precio igual a " + param + "€ son:")
    for (let index in flights) {
      if (flights[index].cost == param) {
        console.log(flights[index])
      };
    };
  }

  var comprar = param => {
    if (flights[param].id) {
      console.log("Vuelo comprado:");
      console.log(flights[param]);
      console.log("Gracias por su compra, vuelva pronto.");
    } else return console.log("El id del vuelo no existe.");
  }

  var preguntarAction = () => {
    var action = prompt('Como usuario puedes:\n -Filtrar por precio, introduce: "mayor", "menor" o "igual".\n -Comprar un vuelo introduce: "comprar".\n -Para terminar introduce: "salir". ').toLowerCase();
    
    if (action === "mayor" || action === "menor" || action === "igual") {
      var parame = prompt("Introduce el precio a filtrar");
    } else if (action === "comprar") {
      var parame = prompt("Introduce el ID del vuelo");
    };
    
    switch(action) {
      case "mayor":
        masAlto(parame);
        return preguntarAction();
      case "menor":
        masBajo(parame);
        return preguntarAction();
      case "igual":
        igualQ(parame);
        return preguntarAction();
      case "comprar":
        comprar(parame);
        return preguntarAction();
      case "salir":
        return console.log("Hasta la próxima!");
      default:
        alert("Error en la instrucción");
        return preguntarAction();
    };
  }
  preguntarAction();
};

//ADMIM
if (usuario === "ADMIN") {
  
//Mostrar vuelos   
  var ver = () => {
    for (let index in flights) {
      console.log(flights[index]);
    };
  }

//Crear vuelos
  var crear = () => {
    if (Object.keys(flights).length <= 15) {
      let id2 = flights.length;
      let to2 = prompt("Indique el destino: ");
      let from2 = prompt("Indique la salida: ");
      let cost2 = prompt("Indique el precio: ");
      let scale2 = prompt("Indique si tiene escala: y/n");
        if (scale2 === "y") {
          var scale3 = true;
        } else if (scale2 === "n") {
          var scale3 = false;
        };
        var nuevoVuelo = {id: id2, to: to2, from: from2, cost: cost2, scale: scale3};
        flights.push(nuevoVuelo);
        console.log("Se ha creado el vuelo:");
        return console.log(nuevoVuelo);   
    } else alert("El listado ha alcanzado el numero máximo de vuelos");   
  }

//Eliminar vuelos
  var borrar = () => {
    var parameAdm = prompt("Introduce el ID del vuelo a borrar");
    console.log("Se ha eliminado el vuelo:");
    console.log(flights[parameAdm]);
    delete flights[parameAdm]; 
  }  

  var preguntarActionAdm = () => {
    var actionAdm = prompt('Como admin puedes:\n -Ver todos los vuelos introduciendo: "ver". \n -Crear vuelos introduciendo: "crear" (máximo 15 vuelos).\n -Para borrar vuelos introduce: "borrar".\n -Para finalizar introduce "salir".');

    switch(actionAdm) {
      case "crear":
        crear();
        return preguntarActionAdm();
      case "ver":
        ver();
        return preguntarActionAdm();
      case "borrar":
        borrar();
        return preguntarActionAdm();
      case "salir":
        return console.log("Hasta la próxima!");
      default:
        alert("Error en la instrucción.");
        return preguntarActionAdm();
    };
  }
  preguntarActionAdm();
};


