function Item({ item: { id, name, image, isFav }, onItemClick, onFavClick }) {
    return <li className="item results__item" onClick={() => onItemClick(id)}>

        {image && <img className="item__img" src={image} />}
        {!image && <img className="item__img" src="https://vignette.wikia.nocookie.net/rickandmorty/images/9/98/S2e3_mount_morty_and_summer.png/revision/latest?cb=20160923231412" />}

        <div className="item__desc">
            <h3 className="item__title">{name}</h3>
            <div className="item__heart-container" onClick={(event) => {
                event.stopPropagation()

                onFavClick(id)
            }}>
                {isFav && <i className="item__heart fas fa-heart"></i>}
                {!isFav && <i className="item__heart far fa-heart"></i>}
            </div>
        </div>
    </li >
}