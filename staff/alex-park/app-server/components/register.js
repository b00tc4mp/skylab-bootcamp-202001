const { Feedback } = require('./feedback')

module.exports = function (props = {}) {
    const { error, name, surname, username } = props

    return `<section class="register">
    <h2>Register</h2>
    <form action="/register" method="POST">
        <input type="text" name="name" placeholder="Name" ${name ? `value="${name}"` : ''}>
        <input type="text" name="surname" placeholder="Surname" ${surname ? `value="${surname}"` : ''}>
        <input type="text" name="username" placeholder="Username" ${username ? `value="${username}"` : ''}>
        <input type="password" name="password" placeholder="Password">
        <button>Submit</button>
        ${error ? Feedback({ level: 'error', message: error }) : ''}
    </form>
    <a href="/login">Login</a>
</section>`
}

