function createLogin(selector, callback, onToRegister) {

    var login = document.querySelector(selector);

    login.addEventListener('submit', function(event) {
        event.preventDefault();

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