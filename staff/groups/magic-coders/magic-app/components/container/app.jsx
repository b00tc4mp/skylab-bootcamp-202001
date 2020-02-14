const { Component, Fragment } = React

class App extends Component {
  state = {
    address: undefined,
    card: undefined,
    cards: [],
    cardsSold: [],
    cardsToSale: [],
    error: undefined,
    language: undefined,
    message: undefined,
    search: {},
    sidebar: false,
    user: undefined,
    users: undefined,
    view: undefined,
    viewProfile: true,
    viewDetail: false
  }

  componentWillMount() {
    const { token } = sessionStorage

    if (token)
      try {
        this.setState({ search: {} })
        retrieveUser(token, (error, user) => {
          if (error) {
            this.logout()
            return this.__handleError__(error)
          }

          this.setState({ view: "search", user })

          if (Object.keys(address.search).length) {
            this.setState({ search: address.search, address: true })

            this.handleSearch({ q: address.search })
          } else if (address.hash && address.hash.startsWith("cards/")) {
            const [, id] = address.hash.split("/")

            this.handleDetail(id)
          }
        })
      } catch (error) {
        this.logout()
      }
    else this.logout()
  }

  logout = () => {
    sessionStorage.clear()
    address.clear()

    this.setState({
      view: "login",
      cards: [],
      sidebar: false,
      user: undefined
    })
  }

  __handleError__ = error => {
    this.setState({ error: error.message })
    setTimeout(() => this.setState({ error: undefined }), 9000)
  }

  handleLogin = ({ username, password }) => {
    try {
      authenticateUser(username, password, (error, token, user) => {
        // Asyn Error
        if (error) this.__handleError__(error)
        else {
          if (error) return this.setState({ error: error.message })

          sessionStorage.token = token
          this.setState({ view: "search", user })
        }
      })
      // Sync Error
    } catch (error) {
      this.__handleError__(error)
    }
  }

  handleGoToRegister = () => this.setState({ view: "register" })

  handleRegister = user => {
    try {
      registerUser(user, (error, message) => {
        // Asyn Error
        if (error) {
          this.__handleError__(error)
        }

        this.setState({ view: "login", message })
        setTimeout(() => this.setState({ message: undefined }), 3000)
      })

      // Sync Errror
    } catch (error) {
      this.__handleError__(error)
    }
  }

  handleGoToLogin = () => this.setState({ view: "login" })

  handleLanguage = lang => this.setState({ language: lang })

  handleLangSelect = ({ target: { value } }) => this.setState({ language: value })

  handleSearch = querys => {
    try {
      let { query, q } = querys

      const { search } = this.state

      let _search = search

      if (query) _search = { ...search, name: query }
      if (q) _search = q

      searchCards(_search, (error, cards) => {
        if (error) {
          this.__handleError__(error)
        } else {
          this.setState({
            cards,
            language: undefined,
            view: "search",
            error: error
          })
        }
      })
    } catch (error) {
      this.__handleError__(error)
    }
  }

  handleSelect = ({ target: { value } }, property) => {
    try {
      const { search } = this.state
      this.setState({ search: { ...search, [property]: value } })
    } catch (error) {
      this.__handleError__(error)
    }
    
  }

  handleCheckbox = (event, property) => {
    try {
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
      
    } catch (error) {

      this.__handleError__(error)
    }
  }

  handleDetail = card => {
    try {
      if (typeof card === "string") {
        retrieveCard(card, (error, cardObj) => {
          address.hash = `cards/${cardObj.multiverseid}`
  
          this.setState({ card: cardObj, cards: [], view: "detail" })
        })
      } else {
        address.hash = `cards/${card.multiverseid}`
        this.setState({ card, cards: [], view: "detail" })
      }
      
    } catch (error) {
      this.__handleError__(error)
    }
  }

  handleSidebar = () => this.setState({ sidebar: !this.state.sidebar })

  onToComponent = view => {
    try {
      if (view === "search") {
        address.hash = ""
        this.setState({ view, cards: [], search: {}, language: undefined })
      } else if (view === "forsale") {
        address.hash = ""
        const { token } = sessionStorage
        retrieveCardsSales(token, (error, cards, users) => {
          this.setState({ cards, users, view })
        })
      } else
        this.setState({ view })

    } catch (error) {
      this.__handleError__(error)
    }
  }

  addToSale = card => {
    try {
      const { token } = sessionStorage
      addCardToSale(card, token, (error, msg) => {})
    } catch (error) {}
  }

  handleProfile = () => {
    try {
      address.hash = ""
      const { token } = sessionStorage
      retrieveUser(token, (error, { toSale, sold }) => {
        if (!toSale) toSale = []

        this.setState({
          view: "profile",
          cardsToSale: toSale,
          cardsSold: sold ? sold : []
        })
      })
    } catch (error) {
      this.__handleError__(error)
    }
    
  }

  handleButtonProfile = () => this.setState({ viewProfile: !this.state.viewProfile })

  handleCardSold = id => {
    try {
      const { token } = sessionStorage
  
      addCardToSold(id, token, (error, msg) => {
        // handle error async - TO DO
        this.handleProfile()
      })
      
    } catch (error) {
      this.__handleError__(error)
    }
  }

  render() {
    const {
      state: {
        address,
        card,
        cards,
        cardsSold,
        cardsToSale,
        language,
        error,
        sidebar,
        user,
        users,
        view,
        viewProfile,
        search
      },

      addToSale,
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
      handleProfile,
      handleButtonProfile,
      handleCardSold,
      logout,
      onToComponent
    } = this

    return (
      <Fragment>
        {(view === "login" || view === "register") && (
          <div className="container-login">
            {view === "login" && (
              <Login
                onSubmit={handleLogin}
                handleGoToRegister={handleGoToRegister}
                error={error}
              />
            )}
            {view === "register" && (
              <Register
                onSubmit={handleRegister}
                handleGoToLogin={handleGoToLogin}
                error={error}
              />
            )}
          </div>
        )}

        {view !== "login" && view !== "register" && view && (
          <Fragment>
            <Navbar
              toggleSidebar={this.handleSidebar}
              sidebar={sidebar}
              logout={logout}
              onTo={onToComponent}
              user={user}
              onToProfile={handleProfile}
            />

            <div
              className={
                view === "search" ? "main-container" : "main-container__forsale"
              }
            >
              {view === "search" && (
                <div className="filter">
                  <Search onSubmit={handleSearch} search={search} />
                  <div className="filters">
                    <Types
                      onChange={handleSelect}
                      property="types"
                      search={search}
                      address={address}
                    />
                    <Rarity
                      onChange={handleSelect}
                      property="rarity"
                      search={search}
                      address={address}
                    />
                    <ManaCost
                      onChange={handleSelect}
                      property="cmc"
                      search={search}
                      address={address}
                    />
                    <Colors
                      onChange={handleCheckbox}
                      property="colors"
                      search={search}
                      address={address}
                    />
                  </div>
                </div>
              )}

              {view === "detail" && (
                <Detail
                  card={card}
                  onTo={onToComponent}
                  addToSale={addToSale}
                  user={user}
                />
              )}
              {view === "search" && !cards.length && (
                <div className="results-nocards"></div>
              )}

              {view === "search" && (
                <Results
                  results={cards}
                  onClickItem={handleDetail}
                  language={language}
                  users={users}
                />
              )}
              {view === "forsale" && (
                <Results
                  results={cards}
                  language={language}
                  view={view}
                  users={users}
                />
              )}
              {view === "profile" && (
                <Profile
                  user={user}
                  view={view}
                  viewProfile={viewProfile}
                  toggleButton={handleButtonProfile}
                  cards={viewProfile ? cardsToSale : cardsSold}
                  toSold={handleCardSold}
                />
              )}
            </div>
          </Fragment>
        )}
        {view !== "login" && view !== "register" && view && (
          <Footer changeLang={handleLangSelect} />
        )}
      </Fragment>
    )
  }
}
