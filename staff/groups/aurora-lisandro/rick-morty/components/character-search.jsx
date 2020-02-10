function CharacterSearch({ query, onSubmit }) {
    return <form className="search-characters" onSubmit={(event) => {
        event.preventDefault()

        const query = event.target.query.value

        onSubmit(query)
    }}>
        <h3>Search for crazy characters</h3>
        <input type="text" name="query" placeholder="Type the character name here" />
        <button type="submit">Good Luck punk</button>
    </form>
}