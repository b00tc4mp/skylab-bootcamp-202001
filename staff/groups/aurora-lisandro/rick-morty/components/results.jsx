function Results({ results, handleClick, onItemFavClick }) {
    debugger
    return <section className="results">
        <h3 className="results__title">Your search results</h3>

        <ul className="results__list">
            {results.map(item => <Item key={item.id} item={item} onItemClick={handleClick} onFavClick={onItemFavClick} />)}
        </ul>
    </section>
}