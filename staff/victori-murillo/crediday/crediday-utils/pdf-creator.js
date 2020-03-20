//Required package
var pdf = require("pdf-creator-node");
var fs = require('fs');
var path = require('path')

module.exports = async() => {

  var html = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

  var options = {
    format: "A3",
    orientation: "portrait",
    border: "6mm",
    header: {
      height: "15mm",
      contents: '<div style="text-align: center;">I love you so much My Helsinki!</div>'
    },
    footer: {
      height: "28mm",
      contents: {
        first: 'Cover page',
        2: 'Second page', // Any page number is working. 1-based index
        default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        last: 'Last Page'
      }
    }
  }

  var users = [
    {
      id: '1',
      time: '03:01',
      name: "Yahaira Herrera Guevara",
      payment: "10.000",
      by: 'Efectivo',
      collector: 'Jealpiva'
    },
    {
      id: '2',
      time: '10:48',
      name: "Allan Salazar Villegas",
      payment: "45.000",
      by: 'BCR',
      collector: 'Jealpiva'
    },
    {
      id: '3',
      time: '14:26',
      name: "Luis Gabriel Gomez Soto",
      payment: "10.000",
      by: 'Efectivo',
      collector: 'Jealpiva'
    },
    {
      id: '1',
      time: '03:01',
      name: "Yahaira Herrera Guevara",
      payment: "10.000",
      by: 'Efectivo',
      collector: 'Jealpiva'
    },
    {
      id: '2',
      time: '10:48',
      name: "Allan Salazar Villegas",
      payment: "45.000",
      by: 'BCR',
      collector: 'Jealpiva'
    },
    {
      id: '3',
      time: '14:26',
      name: "Luis Gabriel Gomez Soto",
      payment: "10.000",
      by: 'Efectivo',
      collector: 'Jealpiva'
    },
    {
      id: '1',
      time: '03:01',
      name: "Yahaira Herrera Guevara",
      payment: "10.000",
      by: 'Efectivo',
      collector: 'Jealpiva'
    },
    {
      id: '2',
      time: '10:48',
      name: "Allan Salazar Villegas",
      payment: "45.000",
      by: 'BCR',
      collector: 'Jealpiva'
    },
    {
      id: '3',
      time: '14:26',
      name: "Luis Gabriel Gomez Soto",
      payment: "10.000",
      by: 'Efectivo',
      collector: 'Jealpiva'
    },
    {
      id: '1',
      time: '03:01',
      name: "Yahaira Herrera Guevara",
      payment: "10.000",
      by: 'Efectivo',
      collector: 'Jealpiva'
    },
    {
      id: '2',
      time: '10:48',
      name: "Allan Salazar Villegas",
      payment: "45.000",
      by: 'BCR',
      collector: 'Jealpiva'
    },
    {
      id: '3',
      time: '14:26',
      name: "Luis Gabriel Gomez Soto",
      payment: "10.000",
      by: 'Efectivo',
      collector: 'Jealpiva'
    },
  ]

  var document = {
    html: html,
    data: {
      users: users
    },
    path: path.join(__dirname, 'output1.pdf')
  };

    await pdf.create(document, options)
    .then(res => {
      console.log(res)
      return res
    })
    .catch(error => {
      console.error(error)
    });
}
