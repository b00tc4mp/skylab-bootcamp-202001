module.exports = function({name, password}) {
    return `
    <h1>Welcome ${name}, ty 4 ur password: ${password} :)</h1>
    <form action="/logout" method="POST">
    <button>LogOut</button>
    </form>
    `
}