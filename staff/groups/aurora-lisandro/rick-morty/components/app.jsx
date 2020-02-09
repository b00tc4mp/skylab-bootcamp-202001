const { Component } = React

class App extends Component {

    state = {

        view: 'login'

    }


    render() {
        const {
            props: { title }, state: { view } } = this


        return <main className='app'>


            
            {view !== 'login' && view !== 'register' && <Navbar
                onLogout={() => console.log('logout')}
                onToSearch={(type) => { console.log(type) }}
                onToFavs={() => console.log('onToFavs')}
                onToProfile={() => { console.log('profile') }} />}
            <h1>{title}</h1>
            {view === 'results' && <Results results={console.log('results')} onItemClick={console.log('item')} onItemFavClick={console.log('fav')} />}
            {view === "register" && <Register onSubmit={console.log('submit')} onToLogin={console.log('login')} error={undefined} />}
            {view==='login' && <Login onSubmit={()=>{console.log('submit login')}} onToRegister={()=>{console.log('on to register')}}/>}



        </main>
    }
}

