function Search({onSubmit}) {
    return <div className="search" >
            <form onSubmit={event => {
            event.preventDefault()
    
            const query = event.target.query.value
    
            onSubmit(query)
        }}>
                <img className="search__icon" src="images/search-solid.svg" onClick={goToResults}/>
                <input className="search__input" type="text"/>
            </form>
        </div>
    
    
    
    
    // <form className="search" onSubmit={event => {
    //     event.preventDefault()

    //     const query = event.target.query.value

    //     onSubmit(query)
    // }}>
    //     <h2>Search in Studio Ghibli API </h2>
    //     <input type="text" name="query" placeholder="criteria" defaultValue={query} />
    //     <button type="submit">Search</button>

    //     {/* { warning && <Feedback level="warning" message={warning} />} */}
    // </form>

    

}