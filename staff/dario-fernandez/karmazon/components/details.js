'use strict'

function Details(response) {
    var details = document.createElement('article')
    details.classList.add('details')

    Component.call(this, details)

    details.innerHTML = '<img src="' + response.image +'"></img>'
        .concat('<p>x</p>')
    

}

Details.prototype = Object.create(Component.prototype)
Details.prototype.constructor = Details