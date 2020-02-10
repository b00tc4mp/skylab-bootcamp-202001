const { Component } = React
class App extends Component {
    state = {

        view: 'searchSeason'


    }


    handleLogin = (username, password) => {
        try {
            authenticateUser(username, password, (error, token) => {
                if (error) return console.log(error)

                sessionStorage.token = token

                this.setState({ view: 'landing' })
            })
        } catch (error) {
            console.log(error)
        }
    }

    handleRegister = (name, surname, username, password) => {
        try {
            registerUser(name, surname, username, password, error => {
                if (error) {
                    console.log(error)
                } else {
                    this.setState({ view: 'login' })
                }
            })
        } catch (error) {
            //TODO
            console.log(error)
        }
    }

    handleOnToRegister = () => this.setState({ view: 'register' })

    handleOnToLogin = () => this.setState({ view: 'login' })

    handleGoToCharacters = () => this.setState({ view: 'character search' })

    handleGoToEpisodes = () => console.log('to episodes')

    handleOnSubmit = query => {
        try {
            const { token } = sessionStorage

            searchCharacters(query, token, (error, response) => {
                if (error) return console.log(error)
                console.log(response)
            })
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        const {
            props: { title }, state: { view }, handleLogin, handleOnToRegister, handleRegister, handleOnToLogin, handleGoToCharacters, handleGoToEpisodes, handleOnSubmit } = this
        return <main className='app'>

            {view !== 'login' && view !== 'register' && <Navbar
                onLogout={() => console.log('logout')}
                onToSearch={(type) => { console.log(type) }}
                onToFavs={() => console.log('onToFavs')}
                onToProfile={() => { console.log('profile') }} />}

            <h1>{title}</h1>

            {view === 'landing' && <Landing onToCharacterSearch={handleGoToCharacters} onToEpisodeSearch={handleGoToEpisodes} />}

            {view === 'login' && <Login onSubmit={handleLogin} onToRegister={handleOnToRegister} />}

            {view === 'results' && <Results results={console.log('results')} onItemClick={console.log('item')} onItemFavClick={console.log('fav')} />}

            {view === "register" && <Register onSubmit={handleRegister} onToLogin={handleOnToLogin} error={undefined} />}


            {view === 'searchSeason' && <SearchSeason onEpisodesClick = {console.log('hola')}/>}

            {view === 'character search' && <CharacterSearch onSubmit={handleOnSubmit} />}

        </main>
    }
}