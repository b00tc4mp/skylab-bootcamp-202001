'use strict'
console.log("bingo() en consola para iniciar");
var ranking = {};
var name = "jugador";
var exit = false;

//bingo();
var bingo = () => {
  var cardBoard = [];
  var numGenCard = [];
  var num = [];
  var line = false;
  var points = 100;
  var number = 0;
  exit = false;

  //Función nombre
  var getName = () => name = prompt("Indique su nombre: ", "Player");

  //Generar número random y guardarlos para evitar repetición
  var empieza = () => {
    number = randomNums();
    if (num.includes(number) === false && num.length !== 100) { 
      num.push(number);
      aplica();
      comprueba();
      if (!exit) return question2();
    } else if (!exit) return empieza();
  }

  //Preguntar si desea el cartón, en caso que no, genera otro
  var question = () => {
    if (confirm("Desea continuar con este cartón?")) return empieza(); 
    else return randomCardboard();
  }

  //Función random Cardboard
  var randomCardboard = () => {
    console.clear();
    for (var i = 0; i < 3; i++) {
      cardBoard[i] = {};
      for (var j = 0; j < 5; j++) {
        var random = randomNums();
        if (numGenCard.includes(random)) {
          numGenCard = [];
          return randomCardboard();
        } else {
          numGenCard.push(random);
          cardBoard[i][random] = "O";
        }
      }
    }
    console.log("Su cartón es el siguiente:");
    console.log(cardBoard[0]);
    console.log(cardBoard[1]);
    console.log(cardBoard[2]);
    return question();
  }

  //Función generar numero random
  var randomNum = 0;
  var randomNums = () => randomNum = Math.floor(Math.random() * (101 - 1)) + 1;

  //Comprobar linea o bingo
  var comprueba = () => {
    var l1 = Object.values(cardBoard[0]);
    var count1 = 0;
    var l2 = Object.values(cardBoard[1]);
    var count2 = 0;
    var l3 = Object.values(cardBoard[2]);
    var count3 = 0;
    
    for (var a = 0; a < l1.length; a++) {
      if (l1[a] === "X") {
        count1 = count1 + 1;
      }
      if (l2[a] === "X") {
        count2 = count2 + 1;
      }
      if (l3[a] === "X") {
        count3 = count3 + 1;
      }
    }

    if (count1 === 5 && !line || count2 === 5 && !line || count3 === 5 && !line) {
      console.log("LINEA!");
    }
    if (count1 + count2 + count3 === 15) {
      console.log("BINGO!");
      console.log("Ha completado el cartón en " + num.length + " turnos");
      if (Object.keys(ranking).includes(name) && ranking[name] < points-num.length || !Object.keys(ranking).includes(name)) {
        ranking[name] = points-num.length;
      };
      showRanking();
      return question3(); 
    } 
  }

  //Pregunta si continua con el juego
  var question2 = () => {
    if (confirm("Ha salido el: " + number + ". Continuar?")) return empieza();
    else {
      exit = true;
      return despedida();
    }
  }

  //Aplicar a carton
  var aplica = () => {
    if (cardBoard[0][number]) cardBoard[0][number] = "X";
    else if (cardBoard[1][number]) cardBoard[1][number] = "X";
    else if (cardBoard[2][number]) cardBoard[2][number] = "X";

    console.clear();
    console.log("Números que han salido: " + num);
    console.log(cardBoard[0]);
    console.log(cardBoard[1]);
    console.log(cardBoard[2]);
    return;
  }

  //Función mostrar ranking
  var showRanking = () => {
    console.log("Ranking:");
    var orderedRanking = orderRanking(ranking);
    for (var i = 0; i < orderedRanking.length; i++) {
      console.log(orderedRanking[i]);
    }
    return;
  }

  //Funcion orden objeto ranking 
  var orderRanking = obj => { //Para ordenar un objeto por valor, hay que pasarlo a array...
    var sortable=[];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        sortable.push([key, obj[key]]); // Push al array en formato [key, value]
      }
    }
    sortable.sort(function(a, b) {  //Ordena el array del ranking
      return b[1]-a[1]; // De mayor a menor
    });
    return sortable;
  }

  //Pregunta si jugar de nuevo
  var question3 = () => { 
    if (confirm("Desea jugar de nuevo?")) return bingo();
    else {
      exit = true;
      return despedida();
    }
  }
  
  //Funcion salir
  var despedida = () => console.log("Hasta la próxima");

  getName();
  randomCardboard();
}








