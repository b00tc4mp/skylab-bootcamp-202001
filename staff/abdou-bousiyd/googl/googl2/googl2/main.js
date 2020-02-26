var search = createSearch('.search', function (query) {
    googl(query, function (results) {
        createResults('.results', results);
    });
});

var login = document.querySelector('button');
login.addEventListener('click', function() {

    search.classList.remove('search--hide');
});