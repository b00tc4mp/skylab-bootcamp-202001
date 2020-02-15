function DetailsEpisode({ item: { name, air_date, episode, characters }, error, onLinkClick }) {
    return <div className="details">
        <section className="details__card details__episodeCard">
            <h3 className="details__card-title">{name}</h3>

            <div className="details__list-container details__episodesList-container">
                <ul className="details__card-list details__episodesList">
                    <li className="details__list-item details__episodesList-item">
                        <p>Air date</p>
                        <p>{air_date}</p>
                    </li>

                    <li className="details__list-item details__episodesList-item">
                        <p>Episode</p>
                        <p className="details__episode">{episode}</p>
                    </li>

                    <li className="details__list-item details__episodesList-item">
                        <p>Characters in the episode</p>
                        <a className="details__link" href="" onClick={event => {
                            event.preventDefault()

                            onLinkClick({ characters })
                        }}> Check the characters in this episode here!</a>
                    </li>
                </ul>
            </div>

            {error && <Feedback level="error" message={error} />}


        </section>

    </div>
}