function DetailsEpisode({ item: { name, air_date, episode, characters }, error }) {
    return <div className="details">  
    <section className="details__card">

        {/* <div className ="details__card-item"> */}

        {/* <div className="details__card-footer"> */}
        <h3 className="details__card-title">{name}</h3>
        {/* {isFav && <i className="fas fa-heart" onClick={(event) => {
                    event.preventDefault()

                    onFavClick(id)
                }}></i>} 
                {!isFav<i className="fas fa-heart" onClick={()}></i>}*/}

        {/* </div> */}
        {/* </div> */}
        <div className ="details__list-container">
            <ul className="details__card-list">
                <li className="details__list-item">
                    <p>Air date</p>
                    <p>{air_date}</p>
                </li>
            </ul>
        </div>
        <ul className="details__card-list">
            <li className="details__list-item">
                <p>Episode</p>
                <p className ="details__episode">{episode}</p>
            </li>
        </ul>
        <ul className="details__card-list">
            <li className="details__list-item">
                <p>Characters in the episode</p>
                <a className="details__link" href="" onClick={event => {
                    event.preventDefault()

                    onLinkClick({characters})
                }}> Check the characters in this episode here!</a>
            </li>
        </ul>
    
        {error && <Feedback level="error" message={error} />}


    </section>

    </div>
}