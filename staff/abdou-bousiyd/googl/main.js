var form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault()
    
    var query = form.query.value

    googl(query, function(results) {
        function makeUL(array) {
            var list = document.createElement('ul');
        
            for (var i = 0; i < array.length; i++) {

                var results = document.createElement('li');
                var titulo = document.createElement('h3');
                var description = document.createElement('p');

        
                titulo.appendChild(document.createTextNode(array[i].title));
                description.appendChild(document.createTextNode(array[i].description));
                //titulo.appendChild(document.createTextNode(array[i].title));
        
                list.appendChild(results);
                results.appendChild(titulo);
                results.appendChild(description);
                

            }
        
            return list;
        }
        
        form.appendChild(makeUL(results));
    })
})

