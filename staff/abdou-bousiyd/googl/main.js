var users = []; // ej: user => { name, surname, username, password }
var loggedUser = null;

var search = createSearch('.search', function (query) {
    googl(query, function (results) {
        createResults('.results', results);
    });
});

createSearch('.search-2', function (query) {
    ecosia(query, function (results) {
        createResults('.results-2', results);
    });
});

// createSearch('.search-3', function (query) {
//     googl(query, function (results) {
//         createResults('.results-3', results);
//     });
// });


function removeClass(selector, modifier) {
    document.querySelector(selector).classList.remove(modifier);
}

function addClass(selector, modifier) {
    document.querySelector(selector).classList.add(modifier);
}

function changeTitle(id, text) {
    document.getElementById(id).innerText = text
}

var login = auth('.login', function(username, password) {
    if (username && password) {
    
        var _user = users.find(function(user){
            return user.username === username && user.password === password
        })

        if (_user){
            loggedUser = _user
            addClass(".login", 'login--hide')
            removeClass(".search", 'search--hide')
            changeTitle("title", "Search")
            changeTitle("user", "Welcome: " + _user.username)
        }else{
            alert('datos incorectos')
        }

    } else alert('Field required');
});


var register = auth('.register', function(username, password) {
    if (username && password) {
        users.push({username, password})
        addClass(".register", 'register--hide')
        removeClass(".login", 'login--hide')
        changeTitle("title", "Login")
    } else alert('Field required');
});
