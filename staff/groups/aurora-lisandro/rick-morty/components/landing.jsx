function Landing({ onToCharacterSearch, onToEpisodeSearch }) {
    return <div className="landing">

        <article className="landing__characters" onClick={(event) => {
            event.preventDefault()

            onToCharacterSearch()
        }}>
            <h3>Find crazy characters</h3>
            <img src="./images/characters.png" className="landing__img" />
        </article>
        <article className="landing__episodes" onClick={(event) => {
            event.preventDefault()

            onToEpisodeSearch()
        }}>
            <h3>Find great episodes</h3>
            <img src="./images/episodes.png" className="landing__img" />
        </article>
    </div>
}