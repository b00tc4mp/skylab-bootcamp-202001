const { Component } = React
class App extends Component {
    state = {
        view: 'login',
        user: undefined,
        error: undefined,
        characters: undefined,
        episodes: undefined,
        detail: undefined,
        favorites: undefined,
        querySeason: undefined,
        query: undefined

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

                    this.setState({ view: 'landing', user })
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
                        const [, id] = address.hash.split('/')

                        this.handleCharacterClick(id)
                    } else if (address.hash && address.hash.startsWith('episode/')) {
                        const [, id] = address.hash.split('/')

                        this.handleEpisodeClick(id)
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

                this.setState({ view: 'landing' })
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
                if (error) this.__handleError__(error)

                address.search = { season }

                this.setState({ view: 'episodes', episodes, query: season })
            })
        } catch (error) {
            this.__handleError__(error)
        }

    }

    handleOnSubmit = query => {
        try {
            const { token } = sessionStorage

            this.setState({ query })

            searchCharacters(query, token, (error, response) => {
                if (error) return this.__handleError__(error)

                address.search = query

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

                this.setState({ view: 'detailEpisode', detail })
            })
        } catch (error) {
            this.__handleError__(error)
        }
    }

    handleCharacterClick = (id) => {
        try {
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
            user: undefined
        })
    }

    handleOnToRegister = () => this.setState({ view: 'register' })

    handleOnToLogin = () => this.setState({ view: 'login' })

    handleGoToFavorites = () => {
        address.clear()
        this.setState({ view: 'favorites', favorites: undefined })
    }

    handleGoToCharacters = () => {
        address.clear()
        this.setState({
            view: 'search',
            characters: undefined,
            episodes: undefined,
            detail: undefined,
            query: undefined
        })
    }

    handleGoToEpisodes = () => {
        address.clear()
        this.setState({
            view: 'seasons',
            characters: undefined,
            episodes: undefined,
            detail: undefined,
            query: undefined
        })

    }

    handleFavClick = id => {
        const { token } = sessionStorage
        try {
            if (this.state.characters) {

                toggleFavoritesCharacters(token, id, error => {
                    if (error) this.__handleError__(error)

                    const query = location.search.split('?')[1]

                    this.handleOnSubmit(query)
                })
            } else if (this.state.episodes) {
                toggleFavoritesEpisodes(token, id, error => {
                    if (error) this.__handleError__(error)

                    const query = location.search.split('?')[1]
                        
                    
                    this.handleSearchEpisodes(this.state.query)
                })
            }
        } catch (error) {
            this.__handleError__(error)
        }
    }


    handleFavoritesCharacters = () => {
        const { token } = sessionStorage
        try {
            retrieveFavCharacters(token, (error, favorites) => {
                this.setState({ view: 'favorites', favorites })
            })
        } catch (error) {
            this.__handleError__(error)
        }
    }

    handleFavoritesEpisodes = () => {
        const { token } = sessionStorage
        try {
            retrieveFavEpisodes(token, (error, favorites) => {
                this.setState({ view: 'favorites', favorites })
            })
        } catch (error) {
            this.__handleError__(error)
        }
    }


    render() {
        const { props: { title }, state: { view, episodes, error, characters, detail, favorites }, handleLogin, handleOnToRegister, handleRegister, handleOnToLogin, handleGoToCharacters, handleGoToEpisodes, handleOnSubmit, handleSearchEpisodes, handleCharacterClick, handleLogout, handleEpisodeClick, handleFavClick, handleGoToFavorites, handleFavoritesCharacters, handleFavoritesEpisodes } = this

        return <main className='app'>

            {view !== 'login' && view !== 'register' && <Navbar
                onLogout={handleLogout}
                onToCharacters={handleGoToCharacters}
                onToEpisodes={handleGoToEpisodes}
                onToFavs={handleGoToFavorites}
                onToProfile={() => { console.log('profile') }} />}

            <img className="title"src={title}/>

            {view === 'login' && <Login onSubmit={handleLogin} onToRegister={handleOnToRegister} error={error} />}

            {view === "register" && <Register onSubmit={handleRegister} onToLogin={handleOnToLogin} error={error} />}

            {view === 'landing' && <Landing onToCharacterSearch={handleGoToCharacters} onToEpisodeSearch={handleGoToEpisodes} />}

            {view === 'search' && <CharacterSearch onSubmit={handleOnSubmit} warning={error} />}

            {view === 'search' && characters && <Results results={characters} onItemFavClick={handleFavClick} handleClick={handleCharacterClick} />}

            {view === 'seasons' && <SearchSeason onEpisodesClick={handleSearchEpisodes} />}

            {view === 'episodes' && episodes && <Results results={episodes} handleClick={handleEpisodeClick} onItemFavClick={handleFavClick} />}

            {view === 'detailEpisode' && <DetailsEpisode item={detail} />}

            {view === 'detail' && <Details item={detail} />}

            {view === 'favorites' && !favorites && <Favorites onToFavCharacters={handleFavoritesCharacters} onToFavEpisodes={handleFavoritesEpisodes} />}

            {view === 'favorites' && favorites && <Results results={favorites} />}

        </main >
    }
}