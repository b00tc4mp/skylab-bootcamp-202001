function createSearch (selector, callback) {

    var search = document.querySelector(selector)

    search.addEventListener('submit', function(event) {

        event.preventDefault();
    
        var query = this.query.value;

        callback(query)
    })

    return search;

}

function createResults (selector, results) {

    var list = document.querySelector(selector)
    list.innerHTML = ''

    results.forEach(function(result) {

        var item = document.createElement('li')
        var title = document.createElement('h3')

        var link = document.createElement('a')
        link.innerText = result.link
        link.target = '_blank';
        link.href = result.link;

        if (result.description !== undefined) {
            var description = document.createElement('p')
            description.innerText = result.description
        }
        if(result.rating !== undefined) {
            var description = document.createElement('p')
            description.innerText = result.description
        }

        title.innerText = result.title

        list.appendChild(item)
        item.appendChild(title)
        item.appendChild(link)
        if (description!==undefined && description!==null) item.appendChild(description)

    })
    return list
}

function enter (selector, callback) {

    var clicked
    var enter = document.querySelector(selector)
    var enterRegister = enter.register
    var enterLogin = enter.login

    // debugger
    enterRegister.addEventListener('click', function(event) {
        event.preventDefault()
        clicked = '.register'
        // debugger
        enter.classList.toggle('enter--hide')
        callback(clicked)
    })

    enterLogin.addEventListener('click', function(event) {
        event.preventDefault()
        clicked = '.login'

        enter.classList.toggle('enter--hide')
        callback(clicked)
    })
    
}

function createRegister(selector, callback) {
    var register = document.querySelector(selector);

    register.classList.toggle('register--hide')

    register.addEventListener('submit', function(event) {
        event.preventDefault();

        var user = {}

        user.username = this.username.value;
        user.password = this.password.value;
        user.surname = this.surname.value;
        user.name = this.name.value

        users.push(user)

        register.classList.toggle('register--hide')

        callback();
    });

    return register;
}


function createLogin(selector, callback) {

    var login = document.querySelector(selector);

    login.classList.toggle('login--hide')

    login.addEventListener('submit', function(event) {
        event.preventDefault();

        var username = this.username.value;
        var password = this.password.value;

        callback(username, password);
    });

    return login;
}








//___________________________________________________ Caquinha

// function createLogin (selector) {
//     var login = document.querySelector(login);
//     login.classList.toggle('login--hide')

//     login.addEventListener('submit', function(event) {

//         event.preventDefault()

//         for (var i = 0; i<users.length; i++) {
//             if (this.username.value === users[i].username && this.password.value === users[i].password) {
//                 login.classList.toggle('login--hide')
//                 search.classList.toggle('search--hide')
//             } else alert('You cannot log in! hahaha')
//         }

//         // register.classList.toggle(selector)
//         // //search.classList.toggle('search--hide');
//         // login.classList.toggle('login--hide');
//     })
// }

// function createRegister (selector) {

//     var register = document.querySelector(selector);

//     register.addEventListener('submit', function(event) {

//         event.preventDefault()

//         var user = {}

//         user.username = this.username.value;
//         user.password = this.password.value;
//         user.surname = this.surname.value;
//         user.name = this.name.value

//         users.push(user)

//         register.classList.toggle('enter--hide')
//         login.classList.toggle('login--hide');
//     })
// }


//register('.register')






// form.addEventListener('submit', function(event) {
//     event.preventDefault();

//     document.querySelector('ul').innerHTML = ''

//     var query = this.query.value;

//     googl(query, function(results) {

//         results.forEach(function(result) {

//             var item = document.createElement('li')
//             var title = document.createElement('h3')

//             var link = document.createElement('a')
//             link.innerText = result.link

//             if (result.description !== undefined) {
//                 var description = document.createElement('p')
//                 description.innerText = result.description
//             }
//             if(result.rating !== undefined) {
//                 var description = document.createElement('p')
//                 description.innerText = result.description
//             }


    
//             title.innerText = result.title

//             document.querySelector('.results').appendChild(item)
//             item.appendChild(title)
//             item.appendChild(link)
//             if (description!==undefined && description!==null) item.appendChild(description)
    
//         })
//         console.log(results);
//     })

// })