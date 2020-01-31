function Login(props) {
    var login = document.createElement('form');
    login.classList.add('login')

    login.innerHTML = '<h2>Login</h2>'
        .concat('<input class="input" type="text" name="username" placeholder="username" required>')
        .concat('<input class="input" type="password" name="password" placeholder="password" required>')
        .concat('<button class="submit" type="submit">OK</button>')
        .concat('<a href="">Register</a>');

    login.addEventListener('submit', function (event) {
        event.preventDefault();

        var username = this.username.value;
        var password = this.password.value;

        props.onSubmit(username, password);
    });

    var register = login.querySelector('a');

    register.addEventListener('click', function (event) {
        event.preventDefault();

        props.onToRegister();
    });

    return login;
}



