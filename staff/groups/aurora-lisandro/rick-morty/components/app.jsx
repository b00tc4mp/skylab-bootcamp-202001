const { Component } = React
class App extends Component {
    state = {
        view: 'login',
        user: undefined,
        error: undefined,
        characters: undefined,
        episodes: undefined,
        detail: undefined
    }

    __handleError__ = (error) => {
        this.setState({ error: error.message, characters: undefined })

        setTimeout(() => {
            this.setState({ error: undefined })
        }, 3000)
    }


    componentWillMount() {
        const { token } = sessionStorage

        if (token)
            retrieveUser(token, (error, user) => {
                if (error)
                    return this.setState({ error: error.message })

                if (location.search) {
                    const query = location.search.split('?')[1]

                    searchCharacters(query, token, (error, response) => {
                        if (error)
                            this.setState({ error: error.message })

                        const { results: characters } = response

                        this.setState({ view: 'search', characters })

                    })
                } else
                    this.setState({ view: 'landing', user })
            })
        else this.setState({ view: 'login' })
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


    handleSearchEpisodes = (querySeason) => {
        try {
            const { token } = sessionStorage
            searchSeason(querySeason, token, (error, episodes) => {
                if (error) this.__handleError__(error)


                this.setState({ view: 'episodes', episodes })
            })
        } catch (error) {
            this.__handleError__(error)
        }

    }

    handleOnSubmit = query => {
        try {
            const { token } = sessionStorage

            searchCharacters(query, token, (error, response) => {
                if (error) return this.__handleError__(error)

                setUrl(query)

                const { results } = response
                this.setState({ view: 'search', characters: results })
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

                this.setState({ view: 'detail', detail })
            })
        } catch (error) {
            this.__handleError__(error)
        }
    }

    handleLogout = () => {
        sessionStorage.clear()

        this.setState({
            view: 'login',
            error: undefined,
            characters: undefined,
            episodes: undefined,
            detail: undefined
        })
    }

    handleOnToRegister = () => this.setState({ view: 'register' })

    handleOnToLogin = () => this.setState({ view: 'login' })

    handleGoToCharacters = () => this.setState({
        view: 'search',
        characters: undefined,
        episodes: undefined,
        detail: undefined
    })

    handleGoToEpisodes = () => this.setState({
        view: 'seasons',
        characters: undefined,
        episodes: undefined,
        detail: undefined
    })

    handleFavClick = id => {
        const { token } = sessionStorage
        try {
            if (this.state.characters) {

                toggleFavoritesCharacters(token, id, error => {
                    if (error) this.__handleError__(error)

                    const query = location.search.split('?')[1]

                    this.handleOnSubmit(query)
                })
            }
        } catch (error) {
            this.__handleError__(error)
        }
    }




    render() {
        const {

            props: { title }, state: { view, episodes, error, characters, detail }, handleLogin, handleOnToRegister, handleRegister, handleOnToLogin, handleGoToCharacters, handleGoToEpisodes, handleOnSubmit, handleSearchEpisodes, handleCharacterClick, handleLogout, handleEpisodeClick, handleFavClick } = this

        return <main className='app'>

            {view !== 'login' && view !== 'register' && <Navbar
                onLogout={handleLogout}
                onToCharacters={handleGoToCharacters}
                onToEpisodes={handleGoToEpisodes}
                onToFavs={() => console.log('onToFavs')}
                onToProfile={() => { console.log('profile') }} />}

            <h1>{title}</h1>

            {view === 'login' && <Login onSubmit={handleLogin} onToRegister={handleOnToRegister} error={error} />}

            {view === "register" && <Register onSubmit={handleRegister} onToLogin={handleOnToLogin} error={error} />}

            {view === 'landing' && <Landing onToCharacterSearch={handleGoToCharacters} onToEpisodeSearch={handleGoToEpisodes} />}

            {view === 'search' && <CharacterSearch onSubmit={handleOnSubmit} warning={error} />}

            {view === 'search' && characters && <Results results={characters} onItemFavClick={handleFavClick} handleClick={handleCharacterClick} />}

            {view === 'seasons' && <SearchSeason onEpisodesClick={handleSearchEpisodes} />}

            {view === 'episodes' && episodes && <Results results={episodes} handleClick={handleEpisodeClick} onItemFavClick={handleFavClick} />}

            {view === 'detailEpisode' && <DetailsEpisode item={detail} />}

            {view === 'detail' && <Details item={detail} />}

        </main >
    }
}