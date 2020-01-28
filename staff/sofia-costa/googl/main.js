var form = document.querySelector('form')

form.addEventListener('submit', function(event) {
    event.preventDefault();

    document.querySelector('ul').innerHTML = ''

    var query = this.query.value;

    googl(query, function(results) {

        results.forEach(function(result) {

            var item = document.createElement('li')
            var title = document.createElement('h3')

            var link = document.createElement('a')
            link.innerText = result.link

            if (result.description !== undefined) {
                var description = document.createElement('p')
                description.innerText = result.description
            }
            if(result.rating !== undefined) {
                var description = document.createElement('p')
                description.innerText = result.description
            }


    
            title.innerText = result.title

            document.querySelector('.results').appendChild(item)
            item.appendChild(title)
            item.appendChild(link)
            if (description!==undefined && description!==null) item.appendChild(description)
    
        })
        console.log(results);
    })

})