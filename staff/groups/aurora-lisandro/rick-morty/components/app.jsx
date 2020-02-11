const { Component } = React
class App extends Component {
    state = {
        view: 'character search',
        error: undefined,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTQyYzQwMWRkOWY0MDAwMTU0MmM4OWQiLCJpYXQiOjE1ODE0MzM4NjUsImV4cCI6MTU4MTQzNzQ2NX0.FDcHFmhMgO-B08j4f8gYrhezCL8gfX2FAerM14QdWtk'
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
                    this.setState(results )
                }
            })
        } catch (error) {
            this.__handleError__(error)
        }
    }

    handleOnToRegister = () => this.setState({ view: 'register' })

    handleOnToLogin = () => this.setState({ view: 'login' })

    handleGoToCharacters = () => this.setState({ view: 'character search' })

    handleGoToEpisodes = (querySeason) => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTQwNTEzNDM5YmIwMzAwMTUzNDcxMjQiLCJpYXQiOjE1ODE0MTI2MjgsImV4cCI6MTU4MTQxNjIyOH0.dV7JPvmv-t4SwgsBrlwYSyoSl5xcPYKQOL4CIplQEBM'

            searchSeason(querySeason, token, (error, results) =>{
                if(error)
                    console.log(error)
                this.setState({view: 'results', results}) //TODO
            })
        }catch (error) {
            console.log(error)
        }

    }

    handleOnSubmit = query => {
        try {
            const { token } = this.state
           
            searchCharacters(query, token, (error, response) => {
                if (error) return this.__handleError__(error)
                console.log(response)
            })
        } catch (error) {
            this.__handleError__(error)
        }
    }


    render() {
        const {
            props: { title }, state: { view, error }, handleLogin, handleOnToRegister, handleRegister, handleOnToLogin, handleGoToCharacters, handleGoToEpisodes, handleOnSubmit } = this
        return <main className='app'>

            {view !== 'login' && view !== 'register' && <Navbar
                onLogout={() => console.log('logout')}
                onToSearch={(type) => { console.log(type) }}
                onToFavs={() => console.log('onToFavs')}
                onToProfile={() => { console.log('profile') }} />}

            <h1>{title}</h1>

            {view === 'landing' && <Landing onToCharacterSearch={handleGoToCharacters} onToEpisodeSearch={handleGoToEpisodes} />}

            {view === 'login' && <Login onSubmit={handleLogin} onToRegister={handleOnToRegister} error={error} />}

            {view === 'results' && <Results results={results} onItemClick={console.log('item')} onItemFavClick={console.log('fav')} />}

            {view === "register" && <Register onSubmit={handleRegister} onToLogin={handleOnToLogin} error={error} />}


            {view === 'searchSeason' && <SearchSeason onEpisodesClick={console.log('hola')} />}

            {view === 'character search' && <CharacterSearch onSubmit={handleOnSubmit} />}

        </main>
    }
}