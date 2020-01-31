function Register(props) {
    var register = document.createElement('form');
    register.classList.add('register');

    register.innerHTML = '<h2>Register</h2>'
        .concat('<input class="input" type="text" name="name" placeholder="name" required>')
        .concat('<input class="input" type="text" name="surname" placeholder="surname" required>')
        .concat('<input class="input" type="text" name="username" placeholder="username" required>')
        .concat('<input class="input" type="password" name="password" placeholder="password" required>')
        .concat('<button class="submit" type="submit">OK</button>')
        .concat('<a href="">Login</a>');

    register.addEventListener('submit', function (event) {
        event.preventDefault();

        var name = this.name.value;
        var surname = this.surname.value;
        var username = this.username.value;
        var password = this.password.value;

        props.onSubmit(name, surname, username, password);
    });

    var login = register.querySelector('a');

    login.addEventListener('click', function (event) {
        event.preventDefault();

        props.onToLogin();
    });

    return register;
}