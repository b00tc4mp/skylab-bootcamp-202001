function Favorites({ onToFavCharacters, onToFavEpisodes }) {
    return <section className="favorites">
        <h3 className="favorites__title">Your favorites</h3>

        <article className="favorites__characters" onClick={(event) => {
            event.preventDefault()

            onToFavCharacters()
        }}>
            <h3 className="favorites__section">Characters</h3>
            <img src="./images/characters.png" className="favorites__img" />
        </article>
        <article className="favorites__episodes" onClick={(event) => {
            event.preventDefault()

            onToFavEpisodes()
        }}>
            <h3 className="favorites__section">Episodes</h3>
            <img src="./images/episodes.png" className="favorites__img" />
        </article>
    </section>
}