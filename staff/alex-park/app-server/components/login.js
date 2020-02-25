const { Feedback } = require('./feedback')

module.exports = function(props = {}) {
    const { error, username } = props

    return `<section class="login">
    <h2>Login</h2>
    <form action="/login" method="POST">
        <input type="text" name="username" placeholder="Username" ${username ? `value="${username}"` : ''}>
        <input type="password" name="password" placeholder="Password">
        ${error ? Feedback({ level: 'error', message: error }) : ''}
        <button>LOGIN</button>
    </form>
    <a href="/register">Register</a>
</section>`
}