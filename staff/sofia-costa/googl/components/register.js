function createRegister(selector, onToLogin) {
    if (typeof selector !== 'string') throw new TypeError(selector + ' is not a string')
    if (typeof onToLogin !== 'function') throw new TypeError(onToLogin + ' is not a function')

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