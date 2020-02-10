const { Component, Fragment } = React

class App extends Component {
  state = { cards: [], language: undefined, search: {}, card: undefined, view: 'search' }

  handleLanguage = lang => this.setState({ language: lang })

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
      retrieveCard(undefined, id, (error, card)=> {
          this.setState({card, view:'detail'})
      })
  }

  render() {
    console.log(this.state.search)
    const {
      state: { cards, card, language, view },
      handleLanguage,
      handleSearch,
      handleSelect,
      handleCheckbox,
      handleDetail
    } = this

    return (
      <Fragment>
        <main>
          <Navbar />
          <div className='container-options'>
            <Search onSubmit={handleSearch} />
            <Types onChange={handleSelect} property="types" />
            <Rarity onChange={handleSelect} property="rarity" />
            <ManaCost onChange={handleSelect} property="cmc" />
            <Colors onChange={handleCheckbox} property="colors" />
          </div>
          
          {cards.length > 0 && (
            <div>
              <Button
                padding="3px 6px"
                value={undefined}
                onClick={handleLanguage}
              >
                English
              </Button>
              {languages.map(value => (
                <Button padding="2px 5px" value={value} onClick={handleLanguage}>
                  {value}
                </Button>
              ))}
            </div>

          )}
          
        </main>
        {view === 'detail' && <Detail card={card}/>}
        {view === 'search' && <Results results={cards} onClickItem={handleDetail} language={language} />}

      </Fragment>
    )
  }
}

