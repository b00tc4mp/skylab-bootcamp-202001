'use strict'
//Tablero 10x10.
//4 barcos en total. De 1, 2, 3 y 4 espacios. 
//Se pasan los datos por parámetro shoot(numero,"letra"), si algun parametro es erroneo se vuelve a preguntar avisando del error.
const bomb = "\ud83d\udca5";
const water = "\ud83c\udf00";
const boat = "\ud83d\udea2"
const column = ["a","b","c","d","e","f","g","h","i","j"];
var tocado = 0;
var tocadoB = 0;
var x = 0;
var y = 0;
var pos = 0;
var boatsPos = {1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[], 8:[]};
var _boatsPos = Object.values(boatsPos);

const create = () => {
  var a = [];
  for (var i = 0; i < 10; i++) {
      a.push({});
      for (var j = 0; j < column.length; j++) {
          a[i][column[j]] = 0;
      }
  }
  return a;
}

//Su tablero, barcos del oponente
var shipBoard = create();

//Mi tablero, disparos al oponente
var opponentBoard = create();

//Mi tablero, mis barcos
var myShipsBoard = create();

var print = () => {
  //console.log("Su tablero de barcos:"); /* Muestra el tablero del oponente */
  //console.table(shipBoard);  /* Muestra el tablero del oponente */
  console.log("Mi tablero de disparos al oponente:");
  console.table(opponentBoard);
  console.log("Mi tablero de barcos:");
  console.table(myShipsBoard);
  return;
}

var verify = () => {
  if (eval(_boatsPos[0][0]) === bomb) {
    _boatsPos[0][0] = 0;
    alert("Barco 1 del oponente hundido!!");
  } else if (eval(_boatsPos[1][0]) == bomb && eval(_boatsPos[1][1]) == bomb) {
    _boatsPos[1][0] = 0;
    _boatsPos[1][1] = 0;
    alert("Barco 2 del oponente hundido!!");
  } else if (eval(_boatsPos[2][0]) == bomb && eval(_boatsPos[2][1]) == bomb && eval(_boatsPos[2][2]) == bomb) {
    _boatsPos[2][0] = 0;
    _boatsPos[2][1] = 0;
    _boatsPos[2][2] = 0;
    alert("Barco 3 del oponente hundido!!");
  } else if (eval(_boatsPos[3][0]) == bomb && eval(_boatsPos[3][1]) == bomb && eval(_boatsPos[3][2]) == bomb && eval(_boatsPos[3][3]) == bomb) {
    _boatsPos[3][0] = 0;
    _boatsPos[3][1] = 0;
    _boatsPos[3][2] = 0;
    _boatsPos[3][3] = 0;
    alert("Barco 4 del oponente hundido!!");
  } else if (eval(_boatsPos[4][0]) === bomb) {
    _boatsPos[4][0] = 0;
    alert("Te han hundido el Barco 1!!");
  } else if (eval(_boatsPos[5][0]) == bomb && eval(_boatsPos[5][1]) == bomb) {
    _boatsPos[5][0] = 0;
    _boatsPos[5][1] = 0;
    alert("Te han hundido el Barco 2!!");
  } else if (eval(_boatsPos[6][0]) == bomb && eval(_boatsPos[6][1]) == bomb && eval(_boatsPos[6][2]) == bomb) {
    _boatsPos[6][0] = 0;
    _boatsPos[6][1] = 0;
    _boatsPos[6][2] = 0;
    alert("Te han hundido el Barco 3!!");
  } else if (eval(_boatsPos[7][0]) == bomb && eval(_boatsPos[7][1]) == bomb && eval(_boatsPos[7][2]) == bomb && eval(_boatsPos[7][3]) == bomb) {
    _boatsPos[7][0] = 0;
    _boatsPos[7][1] = 0;
    _boatsPos[7][2] = 0;
    _boatsPos[7][3] = 0;
    alert("Te han hundido el Barco 4!!");
  }
}

var win = () => {
  console.log("Su tablero de barcos:"); /* Muestra el tablero del oponente */
  console.table(shipBoard);  /* Muestra el tablero del oponente */
  tocado === 10 ? alert("Has ganado") : alert("Has perdido");
  confirm("Quieres volver a jugar?") ? location.reload() : alert("Hasta la próxima");
}

var shoot = () => {
  print(); 
  var a = parseInt(prompt("Introduce la fila a disparar 0 a 9:"));
  var b = prompt("Introduce la columna a disparar a - j");
  if (a === null || b === null) return alert("Hasta la próxima");
  if (typeof(a) !== "number" || a > 9 || a < 0) {
    console.log("Disparo de fila erroneo, vuelve a intentarlo");
    return shoot();
  }

  if (b !== "a" && b !== "b" && b !== "c" && b !== "d" && b !== "e" && b !== "f" && b !== "g" && b !== "h" && b !== "i" && b !== "j") {
    alert("Disparo de columna erroneo, vuelve a intentarlo");
    return shoot();
  }
  
  if (opponentBoard[a][b] === 0) {
    if (shipBoard[a][b] === boat) {
      opponentBoard[a][b] = bomb;
      shipBoard[a][b] = bomb;
      tocado += 1;
      verify();
      if (tocado === 10) return win();
      console.clear();
      console.log("Tocado");
      return shootMe();
    } else {
      opponentBoard[a][b] = water;
      shipBoard[a][b] = water;
      console.clear();
      console.log("Han fallado");
      return shootMe();
    }
  } else {
    alert("Ya has disparado ahi, vuelve a intentar");
    return shoot();
  }
}

var shootMe = () => {
  print();
  var c = Math.floor(Math.random() * 9);
  var d = column[Math.floor(Math.random() * 9)];
  if (myShipsBoard[c][d] === bomb || myShipsBoard[c][d] === water) return shootMe();
  if (myShipsBoard[c][d] === 0) {
    myShipsBoard[c][d] = water;
    console.clear();
    console.log("Han fallado");
    return shoot();
  } else if (myShipsBoard[c][d] === boat) {
    myShipsBoard[c][d] = bomb;
    tocadoB += 1;
    verify();
    console.clear();
    console.log("Te han dado");
    if (tocadoB === 10) return win();
    return shoot();
  }
}

//Poner los barcos de forma random
//Crear 2 aleatorios 1 para fila, y 1 para columna.
var random = (boats) => {
  x = Math.floor(Math.random()*(11-boats));
  y = Math.floor(Math.random()*(11-boats));
  return;
}

var randomPos = () => pos = Math.floor(Math.random()*2);

var putBoat = (boatr, who, id) => {
  var boatsFeature = { id: id, num: boatr, position: [] };
  randomPos();
  if (who === "opponent") {
    random(boatr);
    if (pos === 0) {
      if (boatr === 4 && (shipBoard[x][column[y]] === boat || shipBoard[x+1][column[y]] === boat || shipBoard[x+2][column[y]] === boat || shipBoard[x+3][column[y]] === boat)) {
          return putBoat(boatr,"opponent",id);
      } else if (boatr === 3 && (shipBoard[x][column[y]] === boat || shipBoard[x+1][column[y]] === boat || shipBoard[x+2][column[y]] === boat)) {
          return putBoat(boatr,"opponent",id);
      } else if (boatr === 2 && (shipBoard[x][column[y]] === boat || shipBoard[x+1][column[y]] === boat)) {
          return putBoat(boatr,"opponent",id);
      } else if (boatr === 1 && (shipBoard[x][column[y]] === boat)) {
          return putBoat(boatr,"opponent",id);
      }

      for (var i = x; i < x + boatr; i++) {
        boatsPos[id].push(`shipBoard[${i}][column[${y}]]`);
        boatsFeature.position.push(`shipBoard[${i}][column[${y}]]`);
        shipBoard[i][column[y]] = boat;
      }
      return boatsFeature;
    } else {
      if (boatr === 4 && (shipBoard[x][column[y]] === boat || shipBoard[x][column[y+1]] === boat || shipBoard[x][column[y+2]] === boat || shipBoard[x][column[y+3]] === boat)) {
          return putBoat(boatr,"opponent",id);
      } else if (boatr === 3 && (shipBoard[x][column[y]] === boat || shipBoard[x][column[y+1]] === boat || shipBoard[x][column[y+2]] === boat)) {
          return putBoat(boatr,"opponent",id);
      } else if (boatr === 2 && (shipBoard[x][column[y]] === boat || shipBoard[x][column[y+1]] === boat)) {
          return putBoat(boatr,"opponent",id);
      } else if (boatr === 1 && (shipBoard[x][column[y]] === boat)) {
          return putBoat(boatr,"opponent",id);
      }

      for (var i = y; i < y + boatr; i++) {
        boatsPos[id].push(`shipBoard[${x}][column[${i}]]`);
        boatsFeature.position.push(`shipBoard[${x}][column[${i}]]`);
        shipBoard[x][column[i]] = boat;
      }
      return boatsFeature;
    }
  }

  if (who === "i") {
    random(boatr);
    if (pos === 0) {
    if (boatr === 4 && (myShipsBoard[x][column[y]] === boat || myShipsBoard[x+1][column[y]] === boat || myShipsBoard[x+2][column[y]] === boat || myShipsBoard[x+3][column[y]] === boat)) {
        return putBoat(boatr,"i",id);
    } else if (boatr === 3 && (myShipsBoard[x][column[y]] === boat || myShipsBoard[x+1][column[y]] === boat || myShipsBoard[x+2][column[y]] === boat)) {
        return putBoat(boatr,"i",id);
    } else if (boatr === 2 && (myShipsBoard[x][column[y]] === boat || myShipsBoard[x+1][column[y]] === boat)) {
        return putBoat(boatr,"i",id);
    } else if (boatr === 1 && (myShipsBoard[x][column[y]] === boat)) {
        return putBoat(boatr,"i",id);
    }

    for (var i = x; i < x + boatr; i++) {
      boatsPos[id].push(`myShipsBoard[${i}][column[${y}]]`);
      boatsFeature.position.push(`myShipsBoard[${i}][column[${y}]]`);
      myShipsBoard[i][column[y]] = boat;
    }
    return boatsFeature;
  } else {
    if (boatr === 4 && (myShipsBoard[x][column[y]] === boat || myShipsBoard[x][column[y+1]] === boat || myShipsBoard[x][column[y+2]] === boat || myShipsBoard[x][column[y+3]] === boat)) {
        return putBoat(boatr,"i",id);
    } else if (boatr === 3 && (myShipsBoard[x][column[y]] === boat || myShipsBoard[x][column[y+1]] === boat || myShipsBoard[x][column[y+2]] === boat)) {
        return putBoat(boatr,"i",id);
    } else if (boatr === 2 && (myShipsBoard[x][column[y]] === boat || myShipsBoard[x][column[y+1]] === boat)) {
        return putBoat(boatr,"i",id);
    } else if (boatr === 1 && (myShipsBoard[x][column[y]] === boat)) {
        return putBoat(boatr,"i",id);
    }
    for (var i = y; i < y + boatr; i++) {
      boatsPos[id].push(`myShipsBoard[${x}][column[${i}]]`);
      boatsFeature.position.push(`myShipsBoard[${x}][column[${i}]]`);
      myShipsBoard[x][column[i]] = boat;
    }
    return boatsFeature;
    }
  }
}

var boat1 = putBoat(1,"opponent",1);
var boat2 = putBoat(2,"opponent",2);
var boat3 = putBoat(3,"opponent",3);
var boat4 = putBoat(4,"opponent",4);

var boat5 = putBoat(1,"i",5);
var boat6 = putBoat(2,"i",6);
var boat7 = putBoat(3,"i",7);
var boat8 = putBoat(4,"i",8);

shoot();
