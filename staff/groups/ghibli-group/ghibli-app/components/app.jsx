const {Component, Fragment} = React

class App extends Component {
    state= {view: 'start', error: undefined, token: undefined, films: undefined, film: undefined, loggedIn: false, toggleMenu: false}

    // componentWillMount() {
    //     const {token} = sessionStorage

    //     if(token) {
    //         try{

    //         }
    //     }
    // }


    handleGoToHome = () => {
        this.setState({view: 'home'})
    }

    handleToggleMenu = (toggleMenu) => {
        if (toggleMenu === true){
            this.setState({toggleMenu: false})
            toggleMenu = false
        }
        else {
            this.setState({toggleMenu: true})
            toggleMenu = true
        }
    }

    handleGoToEditProfile = () => {
        this.setState({view: "editProfile", toggleMenu: false})
    }

    handleLogin = (username, password) => {
        try{
            authenticateUser(username, password, (error, token)=>{
                if(error){
                    this.setState({error: error.message})
                } else {
                    retrieveUser(token, (error, user) => {
                        if(error){

                            return this.setState({error: error.message})
    
                        }else{
                            
                            sessionStorage.token = token
    
                            this.setState({ view: 'home', user })
                        }
                    })
                }
            })
    
        }catch(error){
            this.setState({error: error})
        }
    }
    
    handleGoToRegister = () => {this.setState({ view: 'register' })}
    
    handleRegister = (name, email, username, password) => {
        try{
            registerUser(name, email, username, password, error => {
                if(error){
                    this.setState({error: error.message})
                }else{
                    this.setState({view: 'login'})
                }
            })
        }catch(error){
            this.setState(error)
        }
    }
    
    handleGoToLogin = () => {this.setState({ view: 'login' })}

    handleSearchFilms = () => {
        try {
            const { token } = sessionStorage

            const query = location.queryString

            searchFilms(token, query, (error, results) => {
                if (error)
                    return this.setState({error: error.message})

                location.queryString = { q: query }

                this.setState({films})

                if (!results.length)
                    setTimeout(() => {
                        this.setState({ error: undefined })
                    }, 3000)
            })
        } catch (error) {
            this.setState({error: error})
        }
    }

    // handleDetail = id => {
    //     try {
    //         retrieveFilms(id, (error, films) => {
    //             if (error)
    //                 return this.__handleError__(error)
    //             })
    //     } catch (error) {
    //         this.__handleError__(error)
    //     }
    // }

    // handleLogout = () => {
    //     sessionStorage.clear()

    //     // TODO clear querystring in url

    //     this.setState({ view: 'login', user: undefined })
    // }





    render() {

        const {props: {title, query}, state: {view, error, loggedIn, toggleMenu}, handleGoToHome, handleGoToLogin, 
        handleResults, handleToggleMenu, handleGoToWatchlist, handleGoToEditProfile, handleGoToLogout,
        handleLogin, handleRegister, handleGoToRegister, handleSearchFilms, 
        handleDetail} = this

        return <main className="main">
            {view === "start" && <Init title={title} goToLanding={handleGoToHome}/>}

            {view !== "start" && <Header goToLogin={handleGoToLogin} goToSearch={handleResults} goHome={handleGoToHome} showNav={handleToggleMenu} toggleMenu={toggleMenu} loggedIn={loggedIn} onSubmit={handleSearchFilms} warning={error} goToWatchList={handleGoToWatchlist} goToEditProfile={handleGoToEditProfile} goToLogout={handleGoToLogout} />}
            
            {view === "home" && <Landing goToResults={handleSearchFilms}/>}

            {view === "login" && <Login onSubmit={handleLogin} handleGoToRegister={handleGoToRegister} error={error} />}

            {view === "register" && <Register onSubmit={handleRegister} handleGoToLogin={handleGoToLogin} error={error} />}

            {/* {view === 'search' && <Search onSubmit={handleSearchFilms}  warning={error} />} */}

            {view === 'search' && films && <Results results={films} />}

            {view === 'editProfile' && <EditProfile/>}

            {/* {user && <Fragment><h2>{user.name} <button onClick={handleLogout}>Logout</button></h2></Fragment>}

            {view === "login" && <Login onSubmit={handleLogin} handleGoToRegister={handleGoToRegister} error={error} />}

            {view === "register" && <Register onSubmit={handleRegister} handleGoToLogin={handleGoToLogin} error={error} />}

            {view === 'search' && <Search onSubmit={handleSearchFilms} query={query} warning={error} />}

            {view === 'search' && films && <Results results={films} onItemClick={handleDetail} onItemFavClick={handleFav} />}

            {view === 'search' && film && <Detail film={film}/>} */}

            {view !== "start" && <Footer/>}

        </main>
    }
}