function Results({ results, handleClick, onItemFavClick }) {
    
    return <section className="results">

        <ul className="results__list">
            {results.map(item => <Item key={item.id} item={item} onItemClick={handleClick} onFavClick={onItemFavClick} />)}
        </ul>
    </section>
}