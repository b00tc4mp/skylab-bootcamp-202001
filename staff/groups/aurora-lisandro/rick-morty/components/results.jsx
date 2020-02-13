function Results({ results, handleClick, onItemFavClick, warning }) {

    return <section className="results">

        <ul className="results__list">
            {results.map(item => <Item key={item.id} item={item} onItemClick={handleClick} onFavClick={onItemFavClick} />)}
        </ul>
        {warning && <Feedback level="warning" message={warning} />}
    </section>
}