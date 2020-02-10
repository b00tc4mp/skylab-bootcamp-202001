function CharacterSearch({ query, onSubmit, warning }) {
    return <form className="search" onSubmit={(event) => {
        event.preventDefault()

        const query = event.target.query.value

        onSubmit(query)
    }}>
        <h3 className="search__title">Search for crazy characters</h3>
        <div className="search__container">
            <input className="search__input" type="text" name="query" placeholder="Type your search here" />
            <button type="submit"
            ><i className="search__lens fas fa-search"></i></button>
        </div>
        {warning && <Feedback level="warning" message={warning} />}

    </form>
}
