module.exports = function(props = {}){
    const {name, username} = props

    return `<section>
    <h1>Welcome, ${name}!</h1><form action="/logout" method="POST"><input type="hidden" value="${username}" name="username"><button>Logout</button></form>
    //No entiendo bien lo de POST ACTION...
    </section>`
}