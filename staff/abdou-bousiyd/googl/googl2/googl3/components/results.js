function createResults(selector, results) {
    //results //array de objetos de :title-link-description
    var list = document.querySelector(selector)

    list.innerHTML = ''   //<ul> class="googl results"  

    results.forEach(function(result){
        var item = document.createElement('li')//primero es li vacio

        var title = document.createElement('h3')
        title.innerText = result.title

        var link = document.createElement('a')
        link.target = '_blank'
        link.href = result.link

        link.append(title)
        item.append(link)

        if (result.rating) {
            var rating = document.createElement('span');
            rating.innerText = result.rating;

            item.append(rating);
        }

        var description = document.createElement('p');
        description.innerText = result.description;

        item.append(description);

        list.append(item);

        console.log(item)
    })

}