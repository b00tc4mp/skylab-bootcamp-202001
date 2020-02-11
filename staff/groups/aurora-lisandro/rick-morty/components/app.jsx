const { Component } = React
class App extends Component {
    state = {
        view: 'landing',
        error: undefined,
        characters: undefined,
        episodes: undefined,
        detail: undefined
    }

    __handleError__ = (error) => {
        this.setState({ error: error.message })

        setTimeout(() => {
            this.setState({ error: undefined })
        }, 3000)
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
                const { results } = response

                if (error) return this.__handleError__(error)
                this.setState({ view: 'search', characters: results })
            })
        } catch (error) {
            this.__handleError__(error)
        }
    }

    handleItemClick = (id) => {
        try {
            console.log(id)
        } catch (error) {
            this.__handleError__(error)
        }
    }

    handleOnToRegister = () => this.setState({ view: 'register' })

    handleOnToLogin = () => this.setState({ view: 'login' })

    handleGoToCharacters = () => this.setState({ view: 'search' })

    handleGoToEpisodes = () => this.setState({ view: 'seasons' })


    render() {
        const {

            props: { title }, state: { view, episodes, error, characters, detail }, handleLogin, handleOnToRegister, handleRegister, handleOnToLogin, handleGoToCharacters, handleGoToEpisodes, handleOnSubmit, handleSearchEpisodes, handleItemClick } = this

        return <main className='app'>

            {view !== 'login' && view !== 'register' && <Navbar
                onLogout={() => console.log('logout')}
                onToSearch={(type) => { console.log(type) }}
                onToFavs={() => console.log('onToFavs')}
                onToProfile={() => { console.log('profile') }} />}

            <h1>{title}</h1>

            {view === 'login' && <Login onSubmit={handleLogin} onToRegister={handleOnToRegister} error={error} />}

            {view === "register" && <Register onSubmit={handleRegister} onToLogin={handleOnToLogin} error={error} />}

            {view === 'landing' && <Landing onToCharacterSearch={handleGoToCharacters} onToEpisodeSearch={handleGoToEpisodes} />}

            {view === 'search' && <CharacterSearch onSubmit={handleOnSubmit} />}

            {view === 'search' && characters && <Results results={characters} onItemFavClick={console.log('fav')} handleClick={handleItemClick} />}

            {view === 'seasons' && <SearchSeason onEpisodesClick={handleSearchEpisodes} />}

            {view === 'episodes' && episodes && <Results results={episodes} />}

            {view === 'detail' && <Details item={detail} />}




        </main >
    }
}