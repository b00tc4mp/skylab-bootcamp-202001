function Login(props = {}) {
    const { error } = props
    console.log(error)
    return `<section class='login'>
<body>
    <form action="/login" method="post">
        <label for="username">username</label>
        <input type="text" name="username">
        <label for="password">password</label>   
        <input type="password" name="password">
        <button type="submfit">login</button>
        <a href="/register">to register</a>
        ${ error ? `<p class ="login__error">${error}</p>` : ``}
        </form>
        </section> `
}
module.exports = Login