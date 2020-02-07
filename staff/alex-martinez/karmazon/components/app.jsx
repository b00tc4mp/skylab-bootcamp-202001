const IT = '🎈🤡'

const { Component, Fragment } = React

class App extends Component {

    state = { view: 'login', vehicles: undefined, vehicle: undefined, style: undefined, 
    error: undefined, user: undefined}
    
    componentWillMount() {
        const { token } = sessionStorage

        if (token)
            retrieveUser(token, (error, user) => {
                if (error)
                    return this.setState({ error: error.message + ' ' + IT })

                if (location.search) {
                    const query = location.search.split('=')[1]

                    searchVehicles(query, (error, vehicles) => {
                        if (error)
                            this.setState({ error: error.message + ' ' + IT })

                        this.setState({ view: 'search', user, query, vehicles, error: vehicles.length ? undefined : 'No results ' + IT })

                        if (!vehicles.length)
                            setTimeout(() => {
                                this.setState({ error: undefined })
                            }, 3000)
                    })
                } else
                    this.setState({ view: 'search', user })
            })
        else this.setState({ view: 'login' })
    }
    
    handleLogin = (username, password) => {
        try {
            authenticateUser(username, password, (error, token) => {

                if (error) {
                    this.setState({ error: error.message + ' ' + IT })
    
                    setTimeout(() => {
                        this.setState({ error: undefined })

                    }, 3000)

                } else {

                    retrieveUser(token, (error, user) => {

                        if (error)
                            return this.setState({ error: error.message + ' ' + IT })

                        sessionStorage.token = token

                        this.setState({ view: 'search', user })
                    })
                }
            })
            
        } catch (error) {
            this.setState({ error: error.message + ' ' + IT })

            setTimeout(() => {
                this.setState({ error: undefined })
            }, 3000)
        }
    }

    handleGoToRegister = () => this.setState({ view: 'register' })

    handleRegister = (name, surname, username, password) => {
        try {
            registerUser(name, surname, username, password, (error) => {
            if (error) {
                this.setState({ error: error.message + ' ' + IT })

                setTimeout(() => {
                    this.setState({ error: undefined })
                }, 3000)
            } else
                this.setState({ view: 'login' })
            })
        } catch (error) {
            this.setState({ error: error.message + ' ' + IT })

            setTimeout(() => {
                this.setState({ error: undefined })
            }, 3000)
        }
    }

    handleGoToLogin = () => this.setState({ view: 'login' })

    handleSearch = query => {
        searchVehicles(query, vehicles => {
            this.setState({ vehicles, vehicle: undefined, error: vehicles.length ? undefined : 'No results ' + IT })

            if (!vehicles.length)
                setTimeout(() => {
                    this.setState({ error: undefined })
                }, 3000)
        })
    }

    handleDetail = id => {
        retrieveVehicle(id, vehicle =>
            retrieveStyle(vehicle.style, style =>
                this.setState({ vehicle, style})
            )
        )
    }

    handleChangeUsername = (newUsername) => { debugger
            updateUsername(newUsername, token, () => { 
                this.setState({view: "login"}) 
            })
    }

    handleOnToChangeUsername = () => this.setState({view: "changeUsername"}) 

    handleOnToChangePassword = ()  => this.setState({view: "changePassword"})

    handleChangePassword = (oldPassword, password) => {
        updatePassword(oldPassword, password, token, () => {
            this.setState({view: "login"}) 
        })
    }

    handleOnToDeleteUser = () => this.setState({view: "deleteUser"}) 

    handleDeleteUser = (password) => {
        deleteUser(password, token, () => {
            this.setState({view: "login"}) 
        })
    }

    handleOnFavClick = (id, token) => {  debugger
        toggleFavVehicle(id, "faved.png", token, () => {
        })
    }

    handleGoBack =  () => this.setState({ vehicle : undefined})

    render() {
        const { props: { title }, state: { view, vehicles, vehicle, style, error, user}, handleLogin, 
        handleGoToRegister, handleRegister, handleGoToLogin, handleSearch, handleDetail, 
        handleGoBack, handleChangeUsername, handleOnToChangeUsername, handleOnToChangePassword, 
        handleChangePassword, handleDeleteUser, handleOnToDeleteUser, handleOnFavClick} = this

        return <Fragment>
            <h1>{title}</h1>

            {view === 'login' && <Login onSubmit={handleLogin} onToRegister={handleGoToRegister} error={error} />}

            {view === 'register' && <Register onSubmit={handleRegister} onToLogin={handleGoToLogin} error={error} />}

            {view === 'search' && <Search title="Search" onSubmit={handleSearch} warning={error} onToChangeUsername={handleOnToChangeUsername} 
            onToChangePassword={handleOnToChangePassword} onToDeleteUser={handleOnToDeleteUser}/>}
            
            {user && <h1>{user.name}</h1>}

            {view === 'changeUsername' && <ChangeUsername onToLogin={handleGoToLogin} onSubmit={handleChangeUsername} error={error}/>}

            {view === 'changePassword' && <ChangePassword onToLogin={handleGoToLogin} onSubmit={handleChangePassword} error={error}/>}

            {view === 'deleteUser' && <DeleteUser onToLogin={handleGoToLogin} onSubmit={handleDeleteUser} error={error}/>}

            {view === 'search' && vehicles && !vehicle && <Results results={vehicles} onItemClick={handleDetail} 
            onFavClick={handleOnFavClick}/>}

            {view === 'search' && vehicle && vehicles && <Detail vehicle={vehicle} style={style} goBack={handleGoBack}/>}
        </Fragment>
    }
}