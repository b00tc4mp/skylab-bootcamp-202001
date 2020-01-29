var users = []

enter('.enter', function(clicked) {
    if (clicked === '.register') {
        createRegister(clicked, function() {
            createLogin('.login', function(username, password) {
                if (
                users.some(function(user) {return user.username === username && user.password === password})
                ) { 
                    var search = document.querySelector('.search')
                    var login = document.querySelector('.login')
                    search.classList.toggle('search--hide');
                    login.classList.toggle('login--hide');
                    debugger
                    
                } else alert('you cannot get in :P');
            });
        })


    } else if (clicked === '.login') {
        createLogin(clicked, function(username, password) {
            if (
                users.some(function(user) {return user.username === username && user.password === password})
                ) { 
                    var search = document.querySelector('.search')
                    var login = document.querySelector('.login')
                    login.classList.toggle('login--hide');
                    search.classList.toggle('search--hide');

                } else alert('you cannot get in :P');
        })
    }
})

createSearch('.search', function (query) {
    googl(query, function (results) {
        createResults('.results', results);
    });
});





// var login = createLogin('.login', function(username, password) {
//     if (username === 'pepito' && password === '123') {
//         search.classList.toggle('search--hide');
//         login.classList.toggle('login--hide');
//     } else alert('you cannot get in :P');
// });
