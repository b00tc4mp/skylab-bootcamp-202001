'use strict'

function Article(result, onClick) {
    var article = document.createElement('li')
    article.classList.add('article')

    Component.call(this, article)

    article.innerHTML = '<h3>' + result.name + '</h3>'
        .concat('<img src="' + result.thumbnail + '"></img>')
        .concat('<span>' + result.price + '$</span>')
        //.concat('<span>' + result.id + '</span>')

    article.addEventListener('click', function() {
        var id = result.id

        onClick(id)
    })
}

Article.prototype = Object.create(Component.prototype)
Article.prototype.constructor = Article