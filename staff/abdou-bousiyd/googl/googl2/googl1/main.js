var search = document.querySelector('form');

search.addEventListener('submit', function(event){
    event.preventDefault()

    var query = this.query.value

    googl(query, function(results) {
        var list = document.querySelector('ul') //selecciona un Ul

        list.innerHTML = ''

        results.forEach(function (result) {
            var item = document.createElement('li')  //crea LI y dentro de LI añadi H3 primero vacio

            var title = document.createElement('h3')
            title.innerText = result.title //https://www.google.com/?hl=es_419

            var link = document.createElement('a');
            link.target = '_blank';
            link.href = result.link;

            link.append(title) 
            item.append(link)

            if(result.rating){
                var rating = document.createElement('span')
                rating.innerText = result.rating

                item.append(rating)
            }

            var description = document.createElement('p')
            description.innerText = result.description

            item.append(description)
            list.append(item)

        })
    })
})





