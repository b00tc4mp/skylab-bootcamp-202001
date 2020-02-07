function Favs ({id, token, fav, onFavClick}) {

    return <img className="fav" src={fav ? fav : "fav.png"} onClick={event =>{
        event.preventDefault()
        onFavClick(id)}   
    }/>
}