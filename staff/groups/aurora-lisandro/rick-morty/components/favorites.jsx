function Favorites ({favorites, handleClick, onItemFavClick  }) {
    return <section className ="favorites">
        <h3 className="favorites__title">Your favorites</h3>

        <ul className="favorites__list">
            {favorites.map(item => <Item key={item.id} item={item} onItemClick={handleClick} onFavClick={onItemFavClick} />)} 
        </ul>
    </section>
}