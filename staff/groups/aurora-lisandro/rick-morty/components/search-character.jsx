function CharacterSearch({ query, onSubmit, warning }) {
    return <form className="search" onSubmit={(event) => {
        event.preventDefault()

        const query = event.target.query.value

        onSubmit(query)
    }}>
        <h3 className="search__title">Search for crazy characters</h3>

        <div className="search__filters">
                <p>By gender:</p>
                <input type="radio" name="gender" value="male">
                <label for="male">Male</label><br>
                <input type="radio" name="gender" value="female">
                <label for="female">Female</label><br>

                <p>By status:</p>
                <input type="radio" name="status" value="alive">
                <label for="male">Alive</label><br>
                <input type="radio" name="status" value="dead">
                <label for="female">Dead</label><br>
                <input type="radio" name="status" value="unkown">
                <label for="female">Unkown</label><br>

                <p>By species:</p>
                <input type="radio" id="human" name="gender" value="human">
                <label for="male">Human</label><br>
                <input type="radio" id="humanoid" name="gender" value="humanoid">
                <label for="female">Humanoid</label><br>
                <input type="radio" id="alien" name="gender" value="alien">
                <label for="female">Alien</label><br>
        </div>

        <div className="search__container">
            <input className="search__input" type="text" name="query" placeholder="Type your search here" />
            <button type="submit"
            ><i className="search__lens fas fa-search"></i></button>
        </div>
        {warning && <Feedback level="warning" message={warning} />}

    </form>
}
