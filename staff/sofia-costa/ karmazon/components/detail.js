function Detail (result) {
    var detail = document.createElement('div');

    Component.call(this, detail);

    detail.innerHTML = '<h3 class="title">' + result.name + '</h3>'
    .concat('<figure><img src ="' + result.image + '"></figure>')
    .concat('<p class="year">' + result.year + '</p>')
    .concat('<p class="color">' + result.color + '</p>')
    .concat('<p class="maker">' + result.maker + '</p>')
    .concat('<p class="collection">' + result.collection + '</p>')
    .concat('<p class="style">' + result.style + '</p>')
    .concat('<p class="description">' + result.color + '</p>')
    .concat('<p class="price">' + result.price + '</p>')
    .concat('<a class="url">' + result.url + '</a>')

}

Detail.prototype = Object.create(Component)
Detail.prototype.constructor = Detail