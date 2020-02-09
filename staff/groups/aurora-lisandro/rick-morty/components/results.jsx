function Results({results, onItemClick, onItemFavClick}) {
    return <section className="results">
        <h3 className="results__title">Your search results</h3>

        <ul className="item results__item">
            {results.map(item => <Item key = {item.id} item ={item} onClick= {onItemClick} onFavClick = {onItemFavClick}/>)}
        </ul>
    </section>

}