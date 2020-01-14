//'use strict'
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

var bienvenida = () => {
  var nombre = prompt("Enter your username: ");
  console.log("Hello "+ nombre + "!!. " + " Welcome to Skylab Airlines. \uD83D\uDE00");
  console.log("The flights available for today are:");

//Impresión de vuelos bajo formato
  var escalas = 0;
  for (let index in flights) {
    if (flights[index].scale === true) {
      console.log("The flight with origin: " + flights[index].from + ", and destiny: " + flights[index].to + " has a cost of: " + flights[index].cost + " with scale.");
      escalas++;
    } else {
      console.log("The flight with origin: " + flights[index].from + ", and destiny: " + flights[index].to + " has a cost of: " + flights[index].cost + " and does not scale.");
    };
  };

//Coste medio
  var costTotal = 0;
  var numeroVuelos = flights.length-1;
  for (let index in flights) {
    costTotal += flights[index].cost;
  };
  console.log("The average price of our flights is: " + (costTotal/numeroVuelos)+"€.");

//Vuelos que efectuan escalas
  console.log("Today there is " + escalas + " flights that make stops.");

//Últimos vuelos del día
  var destino = "";
  for (var i = flights.length-5; i < flights.length; i++) {
    destino += flights[i].to + ", ";
  };
//Modificando el string
  destino1 = destino.slice([0], destino.length-2) + ".";
  var quit = destino1.lastIndexOf(",");
  destino2 = destino1.slice([0],quit) + " y" + destino1.slice(quit+1);

  console.log("Our last 5 flights are destined: " + destino2);
}

bienvenida();