const { Component, Fragment } = React
class App extends Component {
    state = { locale: undefined, view: undefined, user: undefined, loggedIn: false, error: undefined, token: undefined, cards: undefined, card: undefined, query: undefined, wishedCards: undefined }

    componentWillMount () {
        const { token } = sessionStorage
        if (token) {
            
            retrieveUser(token, (error, user) => {
                if (error) {
                    this.__handleError__(error)
                } else {
                    this.setState({ view: 'search', user, loggedIn: true, token})
                    
                }
            })
        } else {
            this.setState({view: 'login'})
        }
    }

    __handleError__ = error => {
        this.setState({ error: error.message + " :^(" })

        setTimeout(() => {
            this.setState({ error: undefined })
        }, 3000)
    }

    handleLogin = (username, password) => {
        try {
            authenticateUser(username, password, (error, token) => {
                if (error) {
                    this.__handleError__(error)
                } else {
                    sessionStorage.token = token
                    retrieveUser(token, (error, user) => {
                        if (error) {
                            this.__handleError__(error)
                        } else {
                            this.setState({ user })
                        }
                    })
                    this.setState({ view: 'search', token, loggedIn: true })

                    
                }
            })
        } catch(error) {
            this.__handleError__(error)
        }
    }

    handleGoToRegister = () => {
        this.setState({ view: 'register' })
    }

    handleRegister = (name, surname, username, password, age, gender) => {
        try {
            registerUser(name, surname, username, password, age, gender, error => {
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

    handleGoToLogin = () => {
        this.setState({ view: 'login' })
    }
    
    handleSearch = (query, locale) => {
        const { token } = sessionStorage
        
        searchCards(query, token, locale, (error, cards) => {
            if (error) {
                this.__handleError__(error)
            } else {

                this.setState({query, locale, cards, card: undefined})
            }
        })
    }

    handleToggleWL = id => {
        try{
            const {token} = sessionStorage
            
            toggleFavs(id, token, error=>{
                if (error) {
                    return this.__handleError__(error)

                } else {

                    const {query} = this.state

                    if(query)
                        this.handleSearch(query)
                    
                }

                    
            })
        }catch(error){
            this.__handleError__(error)
        }
    }

    handleToggleWLDetail = id => {
        try{
            const {token} = sessionStorage
            
            toggleFavs(id, token, error=>{
                if (error) {
                    return this.__handleError__(error)

                } else {
                    
                    this.handleDetails(id)
                    
                }
            })
        }catch(error){
            this.__handleError__(error)
        }
    }
    
    handleToDeck = () => {
        //
    }

    handleDetails = id => {
        const { token } = sessionStorage, { locale } = this.state
        
        retrieveCard(token, locale, id, (error, card) => {
            if (error) {
                this.__handleError__(error)
            } else {
                this.setState({ view: 'details', card })
            }
        })
    }

    handleDetailBack = () => {
        
        const { query, cards, wishedCards } = this.state
        if (query) {
            if (wishedCards) {
                this.handleToWishlist()
                this.setState({ view: 'wishlisted', wishedCards })
            } else {
                this.handleSearch(query)
                this.setState({view: 'search', card: undefined })
            }
            
        } else {
            if (wishedCards) {
                this.handleToWishlist()
                this.setState({ view: 'wishlisted', wishedCards })
            } else {
                this.setState({ view: 'search' })
            }
        }
    }

    handleBackFromWL = () => {
        const { query } = this.state
        if (query) {
            this.handleSearch(query)
            this.setState({ view: 'search', wishedCards: undefined })    
        } else {
            this.setState({ view: 'search', wishedCards: undefined })
        }
    }

    handleToWishlist = () => {
        const {token} = sessionStorage
        const { locale } = this.state
        displayWishlist(token, locale, (error, wishedCards) =>{
            if (error) {
                this.__handleError__(error)
            } else {
                this.setState({ view: 'wishlisted', wishedCards })
            }
        })
    }

    handleUnwishlist = id => {
        const { token } = sessionStorage
        const { locale } = this.state
        toggleFavs(id, token, error=>{
            if (error) {
                return this.__handleError__(error)

            } else {
                
                displayWishlist(token, locale, (error, wishedCards) =>{
                    if (error) {
                        this.__handleError__(error)
                    } else {
                        this.setState({ view: 'wishlisted', wishedCards })
                    }
                })
            }      
        })
    }

    handleToggleDeck = () => {
        //
    }

    handleLogout = () => {
        sessionStorage.clear()
        this.setState({ user: undefined, token: undefined, view: 'login', loggedIn: false })
    }

    handleRating = rating => {
        const { token } = sessionStorage
        toggleRating(token, rating, error => {
            if (error) {
                this.__handleError__(error)
            } else {
                const { view, locale, query } = this.state
                if (view === 'search') {
                    this.handleSearch(query, locale)
                } else if (view === 'details') {
                    this.handleDetails(rating[0])
                } else if (view === 'wishlisted') {
                    this.handleToWishlist()
                }
            }
        })
    }

    render() {
        const { props: { title }, state: { wishedCards, view, error, loggedIn, cards, card, user, query}, handleLogout, handleToQualities, 
        handleGoToRegister, handleToggleDeck, handleDetailBack, handleToggleWL, handleDetails, handleLogin, handleSearch, handleToggleWLDetail,
        handleRegister, handleUnwishlist, handleRating, handleBackFromWL, handleGoToLogin, handleToWishlist, handleToDeck, handleToType, handleToClasses, handleToRaces, handleToFaction } = this
         
        return <Fragment>

        {user && <BtnsLogged user={user} onWishlist={handleToWishlist} onDeck={handleToDeck}/>}

        {/* {user && <Fragment><h2>{user.name} <button onClick={handleLogout}>Logout</button></h2></Fragment>} */}

        {/* {logo && view !== 'details' && <h1><img src='../hearthstone-template/logo.png' className= 'logo' /></h1> } */}

        { view === 'login' && <Login onSubmit={handleLogin} onToRegister={handleGoToRegister} error={error}/> }
       
        { view === 'register' && <Register onSubmit={handleRegister} onToLogin={handleGoToLogin} error={error} /> }
       
        { view === 'search' && loggedIn && !wishedCards && <Search query={query} onSubmit={handleSearch} onToQualities={handleToQualities}
         onToType={handleToType} onToClasses={handleToClasses} onToRace= {handleToRaces} onToFaction={handleToFaction}
         onWl = {handleToWishlist} /> } 
         
        { view === 'byqualities' && loggedIn && <SearchByQuality onSubmit={handleSearch} onToBack={handleDetailBack}/>}

        { view === 'byclasses' && loggedIn && <SearchByClass onSubmit={handleSearch} onToBack={handleDetailBack} />}

        { view === 'byraces' && loggedIn && <SearchByRaces onSubmit={handleSearch} onToBack={handleDetailBack}/>}

        { view === 'bytype' && loggedIn && <SearchByType onSubmit={handleSearch} onToBack={handleDetailBack}/>}

        { view === 'byfaction' && loggedIn && <SearchByFaction onSubmit={handleSearch} onToBack={handleDetailBack}/>}

        { view === 'search' && loggedIn && cards && !card && <Results results={cards} onRating={handleRating} onItemClick={handleDetails} onWL={handleToggleWL} onItemDeck={handleToggleDeck}/>}

        { view === 'details' && loggedIn && card && <Details detailInfo={card} onRating={handleRating} onItemWL={handleToggleWLDetail} onItemDeck={handleToggleDeck} onBackClick={handleDetailBack}/>} 
        
        { view === 'wishlisted' && loggedIn && wishedCards && <ResultsWL onToBack={handleBackFromWL} onRating={handleRating} results={wishedCards} onItemClick={handleDetails} onWL={handleUnwishlist} onItemDeck={handleToggleDeck}/> }
        </Fragment>
   }
}