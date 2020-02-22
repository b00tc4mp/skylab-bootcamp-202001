module.exports = function (props) {
    const { title, error, username } = props

    return `<form className="search" action="/home/${username}" method="GET">
        <h2>${title}</h2>
        <input type="text" name="query" placeholder="criteria" />

        ${error && `<p>${error}</p>`}

        <button type="submit">Search</button>
    </form >`
}

