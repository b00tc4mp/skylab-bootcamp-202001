function Register(props = {}) {
    const { error } = props
    return `<section class="register">   
    <form action="/register" method="post">
    <label for="name">name</label>
    <input type="text" name="name">
    <label for="surname">surname</label>
    <input type="text" name="surname">
    <label for="username">username</label>
    <input type="text" name="username">
    <label for="password">password</label>
    <input type="password" name="password">
    <button type="submit">Register</button>
    ${ error ? `<p class ="register__error">${error}</p>` : ``}
    <a href="/login"> to Login</a>
</form>`
}
module.exports = Register