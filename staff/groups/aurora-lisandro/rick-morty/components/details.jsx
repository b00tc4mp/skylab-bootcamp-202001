function Details({ item: { id, image, name, status, species, gender, location: { name: locationName } }, onBackButtonClick, onFavClick }) {
    return <section className="details__card">
        <div className="details__card-item">
            <img src={image} alt="" className="details__img" />
            <div className="details__card-footer">
                <h3>{name}</h3>
                {isFav && <i className="fas fa-heart" onClick={(event) => {
                    event.preventDefault()

                    onFavClick(id)
                }}></i>}
                {/* {!isFav<i className="fas fa-heart" onClick={()}></i>} */}
            </div>
        </div>
        <ul className="details__card-list">
            <li className="details__list-item">
                <p>status</p>
                <p>{status}</p>
            </li>
        </ul>
        <ul className="details__card-list">
            <li className="details__list-item">
                <p>species</p>
                <p>{species}</p>
            </li>
        </ul>
        <ul className="details__card-list">
            <li className="details__list-item">
                <p>gender</p>
                <p>{gender}</p>
            </li>
        </ul>
        <ul className="details__card-list">
            <li className="details__list-item">
                <p>Location</p>
                <p>{locationName}</p>
            </li>
        </ul>
    </section>
}