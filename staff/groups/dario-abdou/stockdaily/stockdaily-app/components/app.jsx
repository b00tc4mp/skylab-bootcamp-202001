const { Component } = React

class App extends Component {
    state = { view: 'login', companies: undefined, company: undefined, userName: undefined }

    componentWillMount() {
        const { token } = sessionStorage
        if(token) {
            retrieveUser(token, (error, userInfo) => {
                if(error) {
                    this.setState({ view: 'login' })
                } else {
                    const { name, surname } = userInfo

                    this.setState({ userName: { name, surname }, view: 'search' })

                }
            })
        }       
    }

    handleLogin = credentials =>  {
            authenticateUser(credentials, (error, token) => {
                if(error) {
                    //TODO Handle Error
                } else {
                    sessionStorage.token = token
                    this.setState({ view: 'search' })
                }    
            })
    }

    handleOnToRegister = () => {
        this.setState({ view: 'register' })
    }

    handleRegister = ({ name, surname, username, password }) => {

            registerUser({ name, surname, username, password, investments: [] }, error => {
                if(error) {
                    //TODO Handle Error
                } else {
                    this.setState({ view: 'login' })
                }
            })
    }

    handleOnToLogin = () => {
        this.setState({ view: 'login' })
    }


    handleSearchSubmit = (query) => {
        const { token } = sessionStorage

        searchCompanies(query, token, (error, companies) => {
            if(error) {
                //TODO Handle Error
            } else {
                this.setState({ companies, company: undefined})
            }
        })
    }

    handleOnToDetails = symbol => {
        this.setState({ company: symbol, companies: undefined })
    }

    render() {
        const { props: { title }, state: {view, companies, company, profit}, handleSearchSubmit, handleOnToDetails, handleOnToLogin, handleOnToRegister, handleLogin, handleRegister, handleOnPositionSubmit }= this

        return <main>
                <h1>{title}</h1>

                {view === 'login' && <Login onSubmit={handleLogin} onToRegister={handleOnToRegister} />}
                {view === 'register' && <Register onSubmit={handleRegister} onToLogin={handleOnToLogin} />}

                {view === 'search' && <Search onSearchSubmit={handleSearchSubmit} />}

                {view === 'search' && companies && <Results results={companies} onToDetails={handleOnToDetails} />}
                
                {view === 'search' && company && <Details symbol={company} />}
            </main>
    }
}
