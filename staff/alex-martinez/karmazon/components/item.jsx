function Item ({item: {id, name, thumbnail, price}, onItemClick, onFavClick}) {
    
    return <li key={id} >
        <h3 className="item__name text">{name}</h3>
        <img className="item__thumbnail text" src={thumbnail} onClick={event => {
        event.preventDefault()
        onItemClick(id)
    }}></img>
        <span className="item__price text">{price}€</span>
        <Favs id={id} onFavClick={onFavClick}/>
    </li>
}