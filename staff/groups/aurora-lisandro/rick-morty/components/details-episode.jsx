function DetailsEpisode (name, air_date, episode, characters){
    return <section className="details__card">
        <div className ="details__card-item">
            <img src={image} alt="" className="details__img"/>
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
                <p>Air date</p>
                <p>{air_date}</p>
            </li>           
        </ul>
        <ul className="details__card-list">
            <li className="details__list-item">
                <p>Episode</p>
                <p>{episode}</p>
            </li>           
        </ul>
        <ul className="details__card-list">
            <li className="details__list-item">
                <p>Characters in the episode</p>
                <p>{characters}</p>
            </li>           
        </ul>

    </section>
}