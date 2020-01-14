//Version que con click en columna, ejecuta la función chip(this), this recoge la identificación de la columna para ejecutar el drop() en ella
'use strict'

var buttons = document.getElementsByClassName("buttons")[0];
var home = document.getElementsByClassName("home")[0];
var play = document.getElementsByClassName("container")[0];
var base = document.getElementsByClassName("base")[0];
var randomCol = document.getElementsByClassName("top");
const board = document.querySelectorAll(".pos"); //Nodelist
const nodes = Array.prototype.slice.call(board,0); //Nodelist to Array
var randomActived = false;
var red = 0;
var yellow = 0;
var initial = 0;
var question = undefined;
var turn = "red";

var activeRandom = () => {
  randomActived = true;
  return start();
} 

var start = () => {
  home.style.display = "none";
  play.style.display = "grid";
  buttons.style.display = "flex";
}

var col = start => {
  var x = [];
  for (var i = start; i < nodes.length; i += 7) {
    x.push(nodes[i]);
  };
  return x;
}

const colA = col(0);
const colB = col(1);
const colC = col(2);
const colD = col(3);
const colE = col(4);
const colF = col(5);
const colG = col(6);

var win = () => {
  setTimeout(() => {
  if (red === 4) question = confirm("Ha ganado el rojo. Quieres volver a jugar?");
  else if (yellow === 4) question = confirm("Ha ganado el amarillo. Quieres volver a jugar?");
  else question = confirm("Empate. Quieres volver a jugar?");
    
  question ? reset() : cerrar();

  }, 200);
}

var draw = () => {
  var count = 0;
  for (var i = 0; i < nodes.length; i++) {
    if(nodes[i].style.backgroundColor === "red" || nodes[i].style.backgroundColor === "yellow") {
      count += 1;
    };
    if (count === 42) return win();
  };
  if (turn === "yellow" && randomActived === true) return random();
}

//Función comprobación diagonal hacia izquierda (empieza desde 7 --> index 6)
var checkI = () => {
  for (var i = initial; i < nodes.length; i += 6) {
    if (nodes[i].style.backgroundColor === "") {
      red = 0;
      yellow = 0;
    } else if (nodes[i].style.backgroundColor === "red") {
      red += 1;
      yellow = 0;
    } else if (nodes[i].style.backgroundColor === "yellow") {
      yellow += 1;
      red = 0;
    } else {
      yellow = 0;
      red = 0;
    };
    
    if (red === 4 || yellow === 4) return win();
  
    if (i === 36 || i === 35 || i === 28) { 
      initial -= 1;
      yellow = 0;
      red = 0;
      return checkI();
    } else if ( i === 21) {
      initial = 13;
      yellow = 0;
      red = 0;
      return checkI();
    } else if (i === 37) {
      initial = 20;
      yellow = 0;
      red = 0;
      return checkI();
    } else if (i === 38) {
      initial = 0;
      red = 0;
      yellow = 0;
      return draw();
    };
  };
}

//Función comprobación diagonal de izquierda a derecha.
var checkD = () => {
  for (var i = initial; i < nodes.length; i += 8) {
    if (nodes[i].style.backgroundColor === "") {
      red = 0;
      yellow = 0;
    } else if (nodes[i].style.backgroundColor === "red") {
      red += 1;
      yellow = 0;
    } else if (nodes[i].style.backgroundColor === "yellow") {
      yellow += 1;
      red = 0;
    } else {
      yellow = 0;
      red = 0;
    };
    
    if (red === 4 || yellow === 4) return win();
    
    if (i === 40 || i === 41 || i === 34) { 
      initial += 1;
      yellow = 0;
      red = 0;
      return checkD();
    } else if ( i === 27) {
      initial = 7;
      yellow = 0;
      red = 0;
      return checkD();
    } else if (i === 39) {
      initial = 14;
      yellow = 0;
      red = 0;
      return checkD();
    } else if (i === 38) {
      initial = 6;
      red = 0;
      yellow = 0;
      return checkI();
    };
  };
}

//Función comprobación horizontal
var checkH = () => {
  for (var i = initial; i < nodes.length; i++) {
    if (nodes[i].style.backgroundColor === "") {
      red = 0;
      yellow = 0;
    } else if (nodes[i].style.backgroundColor === "red") {
      red += 1;
      yellow = 0;
    } else if (nodes[i].style.backgroundColor === "yellow") {
      yellow += 1;
      red = 0;
    } else {
      yellow = 0;
      red = 0;
    };
    
    if (red === 4 || yellow === 4) return win();
    
    if (i === 6 || i === 13 || i === 20 || i === 27 || i === 34) {
      initial += 7;
      yellow = 0;
      red = 0;
      return checkH();
    } else if (i === 41) {
      initial = 0;
      red = 0;
      yellow = 0;
      return checkD();
    };
  };
}

//Función comprabación vertical
var checkV = () => {
  for (var i = initial; i < nodes.length; i += 7) {
    if (nodes[i].style.backgroundColor === "") {
      red = 0;
      yellow = 0;
    } else if (nodes[i].style.backgroundColor === "red") {
      red += 1;
      yellow = 0;
    } else if (nodes[i].style.backgroundColor === "yellow") {
      yellow += 1;
      red = 0;
    } else {
      yellow = 0;
      red = 0;
    };

    if (red === 4 || yellow === 4) return win();
      
    if (i === 35 || i === 36 || i === 37 || i === 38 || i === 39 || i === 40) {
      initial += 1;
      yellow = 0;
      red = 0;
      return checkV();
    } else if (i === 41) {
      initial = 0;
      red = 0;
      yellow = 0;
      return checkH();
    };
  };
}

var drop = where => {
  for (var j = where.length -1; j >= 0; j--) {
    if (where[j].style.backgroundColor === "") {
      where[j].style.backgroundColor = turn;
      if (turn === "red") {
        base.style.backgroundColor = "yellow";
        turn = "yellow";
        return checkV();
      } else {
        base.style.backgroundColor = "red";
        turn = "red";
        return checkV();
      };
    };
  };
  if (turn === "yellow") return random();
}

var cerrar = () => location.reload();

var reset = () => {
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].style.backgroundColor = "";
  };
  red = 0;
  yellow = 0;
  turn = "red";
  base.style.backgroundColor = "red";
}

var random = () => {
  turn = "yellow";
  var x = Math.floor(Math.random() * 7);
  x = randomCol[x];
  return chip(x);
}

var chip = param => {
  switch (param.innerText.toLowerCase()){
    case "a":
      return drop(colA);
    case "b":
      return drop(colB);
    case "c":
      return drop(colC);
    case "d":
      return drop(colD);
    case "e":
      return drop(colE);
    case "f":
      return drop(colF);
    case "g":
      return drop(colG);
  };
}