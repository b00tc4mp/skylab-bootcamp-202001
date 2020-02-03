'use strict';

function Detail(results){
    
    var detail = document.createElement('section');
    detail.classList.add('detail');

    Component.call(this, detail);
    
    detail.innerHTML = '<h2 class="detail__title">'+results.name+'</h2>'
        .concat('<img class="detail__image" src="' + results.image +'"></img>')
        .concat('<p class="detail__collection">'+results.collection+'</p>')
        .concat('<span class="detail__price">pvp: '+results.price+' €</span>')
        .concat('<p class="detail__description">'+results.description+'</p>')
        .concat('<a class="detail__back" href= >Go back</a>')

    var goBack = document.querySelector('a');
}

Detail.prototype = Object.create(Component);
Detail.prototype.constructor = Detail;