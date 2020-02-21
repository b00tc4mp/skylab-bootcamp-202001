function Login(props = {}) {
    const { error } = props
    return `<section class='login'>
    <form action="/login" method="post">
        <label for="username">username</label>
        <input type="text" name="username">
        <label for="password">password</label>   
        <input type="password" name="password">
        <button type="submit">login</button>
        <a href="/register">to register</a>
        ${ error ? `<p class ="login__error">${error}</p>` : ``}
        </form>
    </section > `
}
module.exports = Login