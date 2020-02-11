const { Component, Fragment } = React

class App extends Component {

  state = {
    card: undefined, 
    cards: [], 
    cardsToSale: [],
    error: undefined, 
    language: undefined, 
    message: undefined, 
    search: {}, 
    sidebar: false, 
    user: undefined,
    view: undefined, 
  }

  componentWillMount = () => {
    const {token} = sessionStorage
    if (token) {
      retrieveUser(token, (error, user) => {
        this.setState({view: 'search', user})
      })
    } else {
      this.setState({view: 'login'})
    }

  }

  logout = () => {
    sessionStorage.clear()
    this.setState({view: 'login'})
  }

  handleLogin = ({username, password}) => {
    try {
        authenticateUser(username, password, (error, token, user) => {
            // Asyn Error
            if (error) {
                this.setState({error: error.message})
                setTimeout(() => this.setState({error: undefined}), 9000);
            } else {
               
              if (error)
                  return this.setState({ error: error.message })

              sessionStorage.token = token
              this.setState({ view: 'search', user })
                
            }
        })
        // Sync Error
    } catch (error) {
        this.setState({error: error.message})
        setTimeout(() => this.setState({error: undefined}), 3000);
    }
}

handleGoToRegister = () => this.setState({view: "register"})

handleRegister = user => {
  try {
      registerUser(user, (error, message) => {
          // Asyn Error
          if (error) {
              this.setState({error: error.message})
              setTimeout(() => this.setState({error: undefined}), 3000);
          }

          this.setState({view: "login", message})
          setTimeout(() => this.setState({message: undefined}), 3000);

      })
      
      // Sync Errror
  } catch (error) {
      this.setState({error: error.message})
      setTimeout(() => this.setState({error: undefined}), 3000);
  }
  
}

handleGoToLogin = () => this.setState({view: "login"})

  handleLanguage = lang => this.setState({ language: lang })

  handleLangSelect = ({target: {value}}) => this.setState({ language: value })

  handleSearch = ({ query }) => {

    const { search } = this.state

    let _search = search

    if (query) _search = { ...search, name: query }

    searchCards(_search, (error, cards) => {
      this.setState({ cards, language: undefined, view: 'search' })
    })
  }

  handleSelect = ({ target: { value } }, property) => {
    const { search } = this.state
    this.setState({ search: { ...search, [property]: value } })
  }

  handleCheckbox = (event, property) => {
    let { name: color } = event.target
    const { search } = this.state
    const { colors } = search

    let arrayColors = []

    if (!colors) arrayColors.push(color)
    else {
      let actualColors = colors.split("|")
      actualColors.forEach(color => arrayColors.push(color))
      arrayColors.includes(color)
        ? (arrayColors = arrayColors.filter(_color => _color !== color))
        : arrayColors.push(color)
    }

    let stringColors = arrayColors.join("|")

    this.setState({ search: { ...search, [property]: stringColors } })
  }

  handleDetail = id => {
      retrieveCard(id, (error, card)=> {
          this.setState({card, view:'detail'})
      })
  }

  handleSidebar = () => {
    this.setState({sidebar: !this.state.sidebar})
  }

  onToComponent = view => this.setState({view})

  addToSale = id => {
    const {token} = sessionStorage
    addCardToSale(id, token, (error, msg) => {
      console.log(msg);
    })
  }

  handleProfile = () => {
    const {user} = this.state
    const {toSale} = user

    if (toSale && toSale.length > 0) {
      retrieveCardsProfile(toSale, (error, cardsToSale) => {
        this.setState({cardsToSale, view: 'profile'})
      })
    }
  }

  render() {

    const {
      state: { cards, card, language, view, error, sidebar, user,cardsToSale },

      handleLanguage,
      handleLangSelect,
      handleSearch,
      handleSelect,
      handleCheckbox,
      handleDetail,
      handleLogin, 
      handleRegister,
      handleGoToRegister,
      handleGoToLogin,
      logout,
      onToComponent,
      addToSale,
      handleProfile
    } = this

    return (
      <Fragment>
        {(view === 'login' || view === 'register') &&
        <div className="container-login">
          {view === 'login' && <Login onSubmit={handleLogin} handleGoToRegister={handleGoToRegister} error={error}/>}
          {view === 'register' && <Register onSubmit={handleRegister} handleGoToLogin={handleGoToLogin} error={error}/>}
        </div>
        }

        {(view !== 'login' && view !== 'register' && view) &&
        <Fragment>
          <div id="search-container" style={{backgroundColor: 'black'}}>
            <Navbar toggleSidebar={this.handleSidebar} sidebar={sidebar} logout={logout} 
            onTo={onToComponent} user={user} onToProfile={handleProfile} />}

            {view === 'search' && 
            <div className='filter'>
              <Types onChange={handleSelect} property="types" />
              <Rarity onChange={handleSelect} property="rarity" />
              <ManaCost onChange={handleSelect} property="cmc" />
              <Colors onChange={handleCheckbox} property="colors" />
              <Search onSubmit={handleSearch} title="Name Card" />
            </div>}
            {view === 'landing' && cards.length > 0 && (
              <div>
                <Button padding="3px 6px" value={undefined} onClick={handleLanguage} >
    
                </Button>
                {languages.map(value => (
                  <Button padding="2px 5px" value={value} onClick={handleLanguage}>
                    {value}
                  </Button>
                ))}
              </div>
            )}


          </div>
          {view === 'detail' && <Detail card={card} addToSale={addToSale} />}
          {(view === 'search' && !cards.length) && 
          <div className="results-nocards" >
          </div>}
          {view === 'search' && <Results results={cards} onClickItem={handleDetail} language={language} />}
          {view === 'profile' && <Profile user={user} cards={cardsToSale} />}

        </Fragment>
        }
        {view && <Footer changeLang={handleLangSelect}/>}
      </Fragment>
    )
  }
}