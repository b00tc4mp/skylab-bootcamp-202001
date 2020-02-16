function Results({results, query}) {

    return <ul className="results">
            <h2 className="results__title">Search by: {query}</h2>
            {results.map(item => <Item item={item.name} onClick={}/>)}
        </ul> 
            <i className="fas fa-arrow-circle-up results__up"></i>
    
    // <ul className="results">
    //     {results.map(item => <Item key={item.id} item={item} onClick={onItemClick} onFavClick={onItemFavClick} />)}
    // </ul>


}