const { Component } = React
class App extends Component {
    state = {
        view: undefined,
        user: undefined,
        error: undefined,
        characters: undefined,
        episodes: undefined,
        detail: undefined,
        favorites: undefined,
        query: undefined,
        season: undefined
    }

    __handleError__ = (error) => {
        this.setState({ error: error.message, characters: undefined, episodes: undefined })

        setTimeout(() => {
            this.setState({ error: undefined })
        }, 3000)
    }


    componentWillMount() {
        const { token } = sessionStorage

        if (token) {

            try {
                retrieveUser(token, (error, user) => {
                    if (error)
                        this.handleLogout()

                    this.setState({ user })
                    if (address.search.gender
                        || address.search.name
                        || address.search.status
                        || address.search.species) {
                        this.setState({ query: address.search })

                        this.handleOnSubmit(this.state.query)

                    } else if (address.search.season) {
                        this.setState({ query: address.search })

                        this.handleSearchEpisodes(this.state.query.season)
                    } else if (address.hash && address.hash.startsWith('character/')) {
                        let [, id] = address.hash.split('/')
                        id = parseInt(id)
                        this.handleCharacterClick(id)
                    } else if (address.hash && address.hash.startsWith('episode/')) {
                        let [, id] = address.hash.split('/')
                        id = parseInt(id)
                        this.handleEpisodeClick(id)
                    } else {
                        this.setState({ view: 'landing' })
                    }
                })
            } catch (error) {
                this.handleLogout()
            }
        } else {
            this.handleLogout()
        }

    }

    handleLogin = (username, password) => {
        try {
            authenticateUser(username, password, (error, token) => {
                if (error) return this.__handleError__(error)

                sessionStorage.token = token

                retrieveUser(token, (error, user) => {
                    if (error)
                        this.__handleError__(error)

                    this.setState({ view: 'landing', user })
                })
            })
        } catch (error) {
            this.__handleError__(error)
        }
    }

    handleRegister = (name, surname, username, password) => {
        try {
            registerUser(name, surname, username, password, error => {
                if (error) {
                    this.__handleError__(error)
                } else {
                    this.setState({ view: 'login' })
                }
            })
        } catch (error) {
            this.__handleError__(error)
        }
    }


    handleSearchEpisodes = (season) => {
        try {
            const { token } = sessionStorage
            searchSeason(season, token, (error, episodes) => {
                if (error) return this.__handleError__(error)

                address.search = { season }

                this.setState({ view: 'episodes', episodes, season, query: season })
            })
        } catch (error) {
            this.__handleError__(error)
        }

    }

    handleOnSubmit = query => {
        try {
            const { token } = sessionStorage

            address.search = query
            this.setState({ query })

            query = createQueryString(query)
            searchCharacters(query, token, (error, response) => {
                if (error) return this.__handleError__(error)

                const { results } = response
                this.setState({ view: 'search', characters: results, query })
            })
        } catch (error) {
            this.__handleError__(error)
        }
    }

    handleEpisodeClick = (id) => {
        try {
            const { token } = sessionStorage
            retrieveEpisode(token, id, (error, detail) => {
                if (error) console.log(error)
                address.hash = `episode/${id}`

                this.setState({ view: 'detailEpisode', detail, query: id })
            })
        } catch (error) {
            this.__handleError__(error)
        }
    }

    handleCharacterClick = (id) => {
        try {
            console.log(typeof id)
            const { token } = sessionStorage
            retrieveCharacter(token, id, (error, detail) => {
                if (error) console.log(error)

                address.hash = `character/${id}`

                this.setState({ view: 'detail', detail })
            })
        } catch (error) {
            this.__handleError__(error)
        }
    }

    handleLogout = () => {
        sessionStorage.clear()
        address.clear()
        this.setState({
            view: 'login',
            error: undefined,
            characters: undefined,
            episodes: undefined,
            detail: undefined,
            user: undefined,
            favorites: undefined,
            query: undefined
        })
    }

    handleOnToRegister = () => this.setState({ view: 'register' })

    handleOnToLogin = () => this.setState({ view: 'login' })

    handleGoToFavorites = () => {
        address.clear()
        this.setState({ view: 'favorites', favorites: undefined, characters: undefined, episodes: undefined, query: undefined, error: undefined })
    }

    handleGoToCharacters = () => {
        address.clear()
        this.setState({
            view: 'search',
            characters: undefined,
            episodes: undefined,
            detail: undefined,
            query: undefined,
            error: undefined,
            season: undefined
        })
    }

    handleGoToEpisodes = () => {
        address.clear()
        this.setState({
            view: 'seasons',
            characters: undefined,
            episodes: undefined,
            detail: undefined,
            query: undefined,
            error: undefined,
            season: undefined
        })

    }

    handleFavClick = id => {
        const { token } = sessionStorage
        try {
            if (this.state.characters) {
                debugger
                toggleFavoritesCharacters(token, id, error => {
                    if (error) this.__handleError__(error)

                    this.handleOnSubmit(this.state.query)
                })
            } else if (this.state.episodes) {
                toggleFavoritesEpisodes(token, id, error => {
                    if (error) this.__handleError__(error)


                    this.handleSearchEpisodes(this.state.query)
                })
            } else if (this.state.favorites) {
                if (this.state.view === 'favorite-characters') {
                    toggleFavoritesCharacters(token, id, error => {
                        if (error) this.__handleError__(error)

                        this.handleFavoritesCharacters()
                    })
                } else if (this.state.view === 'favorite-episodes') {
                    toggleFavoritesEpisodes(token, id, error => {
                        if (error) this.__handleError__(error)

                        this.handleFavoritesEpisodes()
                    })
                }
            }
        } catch (error) {
            this.__handleError__(error)
        }
    }


    handleFavoritesCharacters = () => {
        const { token } = sessionStorage
        try {

            retrieveFavCharacters(token, (error, favorites) => {
                if (error) return this.__handleError__(error)

                this.setState({ view: 'favorite-episodes', favorites, error: !favorites.length ? 'No Favorites' : undefined })
            })
        } catch (error) {
            this.__handleError__(error)
        }
    }

    handleFavoritesEpisodes = () => {
        const { token } = sessionStorage
        try {
            retrieveFavEpisodes(token, (error, favorites) => {
                if (error) return this.__handleError__(error)

                this.setState({ view: 'favorite-episodes', favorites, error: !favorites.length ? 'No Favorites' : undefined })
            })
        } catch (error) {
            this.__handleError__(error)
        }
    }

    handleStarring = (characters) => {
        const results = characters.characters
        const idArray=[]
        
        results.forEach(link => {
            let arr=link.split('/')
            let id = arr[arr.length-1]
            idArray.push(id)
        })
        try {
            const {token} = sessionStorage
            retrieveCharacterOfEpisodes(token, idArray, (error, characters)=>{
                this.setState({view:'search', characters, episodes: undefined, detail: undefined})
            })

        }catch(error){
            this.__handleError__(error)
        }

    }
      
      handleBackToResults = () => {
        if (address.hash.startsWith('episode/')) {
            this.handleSearchEpisodes(this.state.season)
        } else if (address.hash.startsWith('character/')) {
            this.handleOnSubmit(this.state.query)
        }
    }



    render() {
        const { props: { title }, state: { view, episodes, error, characters, detail, favorites }, 
        handleLogin, handleOnToRegister, handleRegister, handleOnToLogin, handleGoToCharacters, handleGoToEpisodes, handleOnSubmit,
        handleSearchEpisodes, handleCharacterClick, handleLogout, handleEpisodeClick, handleFavClick, handleGoToFavorites, handleFavoritesCharacters, 
        handleFavoritesEpisodes,handleStar

        return <main className='app'>

            {view !== 'login' && view !== 'register' && <Navbar
                onLogout={handleLogout}
                onToCharacters={handleGoToCharacters}
                onToEpisodes={handleGoToEpisodes}
                onToFavs={handleGoToFavorites}
                onToProfile={() => { console.log('profile') }} />}

            {view === 'login' && <img className="title" src={title} />}

            {view === 'register' && <img className="title" src={title} />}


            {view === 'login' && <Login onSubmit={handleLogin} onToRegister={handleOnToRegister} error={error} />}

            {view === "register" && <Register onSubmit={handleRegister} onToLogin={handleOnToLogin} error={error} />}

            {view === 'landing' && <Landing onToCharacterSearch={handleGoToCharacters} onToEpisodeSearch={handleGoToEpisodes} />}

            {view === 'search' && <CharacterSearch onSubmit={handleOnSubmit} warning={error} />}

            {view === 'search' && characters && <Results results={characters} onItemFavClick={handleFavClick} handleClick={handleCharacterClick} />}

            {view === 'seasons' && <SearchSeason onEpisodesClick={handleSearchEpisodes} />}

            {view === 'episodes' && episodes && <Results results={episodes} handleClick={handleEpisodeClick} onItemFavClick={handleFavClick} />}

            {view === 'detailEpisode' && <DetailsEpisode item={detail} onLinkClick={handleStarring}/>}

            {view === 'detailEpisode' && <DetailsEpisode item={detail} on LinkClick={handleStarring} onBackButtonClick={handleBackToResults} />}


            {view === 'detail' && <Details item={detail} onBackButtonClick={handleBackToResults} />}

            {view === 'favorites' && !favorites && <Favorites onToFavCharacters={handleFavoritesCharacters} onToFavEpisodes={handleFavoritesEpisodes} warning={error} />}

            {view === 'favorite-characters' && favorites && <Results results={favorites} onItemFavClick={handleFavClick} handleClick={handleCharacterClick} warning={error} />}

            {view === 'favorite-episodes' && favorites && <Results results={favorites} onItemFavClick={handleFavClick} handleClick={handleEpisodeClick} warning={error} />}



        </main >
    }
}