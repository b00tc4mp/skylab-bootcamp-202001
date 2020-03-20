import React from 'react';
import './search.sass';

function SearchCrypto({query, handleSearch}) {

    const  handleOnSubmit = (event) => {
        event.preventDefault()

        const query = event.target.query.value

        if(query === '') return 

        handleSearch(query)
        console.log(query)

    }


    return <form className="search" onSubmit={handleOnSubmit}>
                <input type="text" name="query" placeholder="criteria" defaultValue={query} />
                <button type="submit">Search</button>
            </form>

}

export default SearchCrypto;
