function SearchSeason ({onEpisodesClick}){ 
    return <section className = "searchSeason" >
        <h2 className="searchSeason__title">Choose a season</h2>
        <div className="searchSeason__component">

            <article className="searchSeason__season">
                <img className ="searchSeason__image"src="./images/season_1.png"/>
                <button className="searchSeason__button" onClick ={event=>{
                    event.preventDefault()

                    onEpisodesClick('S01')
                    }}>Season one</button>
            </article>

            <article className="searchSeason__season">
                <img className ="searchSeason__image" src="./images/season_2.png"/>
                <button className="searchSeason__button" onClick ={event=> {
                    event.preventDefault()

                    onEpisodesClick('S02')
                    }}>Season two</button>
            </article>

            <article className="searchSeason__season">
                <img className ="searchSeason__image" src="./images/season_3.png"/>
                <button className="searchSeason__button" onClick ={event=>{
                    event.preventDefault()

                    onEpisodesClick('S03')
                    }}>Season three</button>
            </article>
        </div>
    </section>
}