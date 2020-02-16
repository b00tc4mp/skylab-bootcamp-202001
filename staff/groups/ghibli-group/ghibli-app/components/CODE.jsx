
//Results Component

function Results({results}) {
    return <ul className="results">
        {results.map(item => <Item key={item.id} item={item} />)}
    </ul>
} 

//Item Component

function Item({item: {id, title, description, director, producer, release_date, rt_score }}) {
  
    return <li key={id} >
         <p>{title}</p>
         <p>{director}</p>
         <p>{producer}</p>
         <p>{release_date}</p>
         <p>{rt_score}</p>
         <p>{description}</p>
    </li>
} 

//handler para buscar films

handleSearchFilms = () => {
    try {
        const { token } = sessionStorage

        searchFilms(token,(error, films) => {
            if (error)
                return this.setState({error: error.message})

            location.queryString = { q: 'films' }

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

// State inicial de APP
state= {view: 'login', error: undefined, token: undefined, films: undefined}

// Render de APP

    render(); {

    const {props: {title, results}, state: {view,error,films}, handleGoToLogin, handleLogin, handleRegister, handleGoToRegister, handleSearchFilms} = this

    return <Fragment>

        <h1>{title}</h1>

        {view === "login" && <Login onSubmit={handleLogin} handleGoToRegister={handleGoToRegister} error={error} />}

        {view === "register" && <Register onSubmit={handleRegister} handleGoToLogin={handleGoToLogin} error={error} />}

        {view === 'search' && <Search onSubmit={handleSearchFilms} warning={error} />}

        {view === 'search' && films && <Results results={films}/>}

    </Fragment>
}

//----------------------LOGIC----------------//


function searchFilms(token, callback) {

    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)

    const [header, payload, signature] = token.split('.')
    if (!header || !payload || !signature) throw new Error('invalid token')

    const { sub } = JSON.parse(atob(payload))

    if (!sub) throw new Error('no user id in token')

    //if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    call(`https://skylabcoders.herokuapp.com/api/v2/users/${sub}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }, (error, response) => {
        if (error) return callback(error)

        const user = JSON.parse(response.content), { error: _error } = user

        if (_error) return callback(new Error(_error))

        const { favs = [] } = user

        call(`https://ghibliapi.herokuapp.com/films/`, undefined, (error, response) => {
            if (error) return callback(error)

            if (response.status === 200) {
                const films = JSON.parse(response.content)

                //films.forEach(film => film.isFav = favs.includes(film.id))
                console.log(films)

                callback(undefined, films)
            }
        })
    })
}