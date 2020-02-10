function SearchSeason (onEpisodesClick){
    return <form className = "searchSeason" >
    <h2 className="searchSeason__title">Choose a season</h2>
    <div className="searchSeason__component">

        <div className="searchSeason__season">
            <img className ="searchSeason__image"src="https://upload.wikimedia.org/wikipedia/en/b/b8/Rick_and_Morty_season_1.png"/>
            <button className="searchSeason__button" onClick ={()=>onEpisodesClick('S0E1')}>Season 1</button>
        </div>

        <div className="searchSeason__season">
            <img className ="searchSeason__image" src="https://upload.wikimedia.org/wikipedia/en/b/b1/Rick_and_Morty_season_2.png"/>
            <button href="" className="searchSeason__button" onClick ={()=>onEpisodesClick('S0E2')}>Season 2</button>
        </div>

        <div className="searchSeason__season">
            <img className ="searchSeason__image" src="https://upload.wikimedia.org/wikipedia/en/5/52/Rick_and_Morty_season_3.png"/>
            <button href="" className="searchSeason__button" onClick ={()=>onEpisodesClick('S0E3')}>Season3</button>
        </div>
    </div>
    </form>
}