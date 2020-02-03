var searchGoogle = createSearch('.search', {
    onSubmit: function (query) {
        googl(query, function (results) {
            if (results instanceof Error) return alert(results.message + ' ' + IT);
            
            createResults('ul.results', results);
        });
    }
});

var searchEcosia = createSearch('.search__Two', {
    onSubmit: function (query) {
        ecosia(query, function (results) {
            createResults('ul.results-2', results);
        });
    }
});

var searchBing = createSearch('.search__Three', {
    onSubmit: function (query) {
        bing(query, function (results) {
            createResults('ul.results-3', results);
        });
    }
});



// var searchGoogle = createSearch('.search', function (query) {
//     googl(query, function (results) {
//         footer.classList.toggle('footer--hide')  //for hide footer
//         searchEcosia.classList.toggle('search--hide')
//         searchBing.classList.toggle('search--hide')
//         createResults('.results', results);

//     });
// });


// var searchEcosia = createSearch('.search__Two', function (query) {
//     ecosia(query, function (results) {
//         footer.classList.toggle('footer--hide')  //for hide footer
//         searchGoogle.classList.toggle('search--hide');
//         searchBing.classList.toggle('search--hide')
//         createResults('.results-2', results);
//     });
// });

// var searchBing = createSearch('.search__Three', function (query) {
//     bing(query, function (results) {
//         footer.classList.toggle('footer--hide')  //for hide footer
//         searchGoogle.classList.toggle('search--hide');
//         searchEcosia.classList.toggle('search--hide')
//         createResults('.results-3', results);
//     });
// });

var back = document.querySelector('.back') //button back to Register
var footer = document.querySelector('.footer') //take value for hide footer when search

var IT = '🎈🤡';

var login = createLogin('.login', {
    onSubmit: function (username, password) {
        try {
            authenticate(username, password);

            login.toggle();
            searchGoogle.toggle();
            searchEcosia.toggle();
            searchBing.toggle();
            // _yahoo.toggle();
        } catch (error) {
            alert(error.message + ' ' + IT);
        }
    },
    onToRegister: function () {
        login.toggle();
        register.toggle();
    }
});
// var login = createLogin('.login', function (username, password) {debugger
//     if (users.length === 0) {
//         alert('you cannot get in, you must register before :P')
//     }

//     for (var i = 0; i < users.length; i++) {
//         if (users[i].username === username && users[i].password === password) {
//             searchGoogle.classList.toggle('search--hide');
//             searchEcosia.classList.toggle('search--hide')
//             searchBing.classList.toggle('search--hide')
//             login.classList.toggle('login--hide');
//             back.classList.toggle('back--hide');

//         }
//         else {
//             alert('you cannot get in :P')
//         }
//     }

// });


var register = createRegister('.register', {
    onSubmit: function (name, surname, username, password) {
        try {
            register(name, surname, username, password);

            register.toggle();
            login.toggle();
        } catch (error) {
            alert(error.message + ' ' + IT);
        }
    },
    onToLogin: function () {
        register.toggle();
        login.toggle();
    }
});



// var register = createRegister('.register', function (name, surname, usernameregister, passwordregister) {

//     var user = {
//         name: name,
//         surname: surname,
//         username: usernameregister,
//         password: passwordregister
//     }

//     users.push(user)
    
//     login.classList.toggle('login--hide');
//     register.classList.toggle('register--hide');

//     back.classList.toggle('back--hide')

//     var reset = document.getElementsByClassName('register__type');
//     for (var i = 0; i < reset.length; i++) {
//         reset[i].value = '';
//     }
// });

// back.addEventListener('click', function () {
//     login.classList.toggle('login--hide');
//     register.classList.toggle('register--hide');
//     back.classList.toggle('back--hide')

// });

