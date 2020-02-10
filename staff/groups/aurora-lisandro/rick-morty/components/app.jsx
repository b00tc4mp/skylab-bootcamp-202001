const { Component } = React
class App extends Component {
    state = {
        view: 'login'
    }


    handleLogin = (username, password) => {
        try {
            authenticateUser(username, password, (error, token) => {
                if (error) return console.log(error)
                this.setState({ view: undefined })
            })
        } catch (error) {
            console.log(error)
        }
    }

    handleOnToRegister = () => this.setState({ view: 'register' })


    render() {
        const {
            props: { title }, state: { view }, handleLogin, handleOnToRegister } = this
        return <main className='app'>

            {view !== 'login' && view !== 'register' && <Navbar
                onLogout={() => console.log('logout')}
                onToSearch={(type) => { console.log(type) }}
                onToFavs={() => console.log('onToFavs')}
                onToProfile={() => { console.log('profile') }} />}

            <h1>{title}</h1>

            {view === 'login' && <Login onSubmit={handleLogin} onToRegister={handleOnToRegister} />}

            {view === 'results' && <Results results={console.log('results')} onItemClick={console.log('item')} onItemFavClick={console.log('fav')} />}

            {view === "register" && <Register onSubmit={() => { console.log('submit') }} onToLogin={() => { console.log('login') }} error={undefined} />}
        </main>
    }
}