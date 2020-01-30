function createRegister(selector, onToLogin) {
    var register = document.querySelector(selector);

    register.addEventListener('submit', function(event) {
        event.preventDefault();

        var user = {}

        user.username = this.username.value;
        user.password = this.password.value;
        user.surname = this.surname.value;
        user.name = this.name.value

        users.push(user)

        register.classList.toggle('register--hide')

    });

        var login = document.querySelector('.login-link')

        login.addEventListener('click', function(event) {
            event.preventDefault()
            
            onToLogin()
        })

    return register;
}


function createLogin(selector, callback, onToRegister) {

    var login = document.querySelector(selector);

    login.addEventListener('submit', function(event) {
        event.preventDefault();

        login.classList.toggle('login--hide')

        var username = this.username.value;
        var password = this.password.value;

        callback(username, password);
    });

    var register = document.querySelector('.register-link')

    register.addEventListener('click', function(event) {
        event.preventDefault()
        
        onToRegister()
    })

    return login;
}





// function enter (selector, callback) {

//     var clicked
//     var enter = document.querySelector(selector)
//     var enterRegister = enter.register
//     var enterLogin = enter.login

//     // debugger
//     enterRegister.addEventListener('click', function(event) {
//         event.preventDefault()
//         clicked = '.register'
//         // debugger
//         enter.classList.toggle('enter')
//         callback(clicked)
//     })

//     enterLogin.addEventListener('click', function(event) {
//         event.preventDefault()
//         clicked = '.login'

//         enter.classList.toggle('enter')
//         callback(clicked)
//     })
    
// }



// function createLogin(selector, callback) {

//     var login = document.querySelector(selector);

//     login.classList.toggle('login--hide')

//     login.addEventListener('submit', function(event) {
//         event.preventDefault();

//         var username = this.username.value;
//         var password = this.password.value;

//         callback(username, password);
//     });

//     return login;
// }