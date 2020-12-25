let cards = []

for (let i = 7; i <=7 ; i++) {
  fetch('https://api.magicthegathering.io/v1/cards?page=' + i)
  .then(response => response.json())
  .then(results => results.cards.forEach(card => cards.push(card)))
  .catch(e => console.log(e))
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

let file_name = 'cards.js'

download(file_name, JSON.stringify({cards : cards}) )

// then, open the file with visual studio code.