const { Component } = React

class App extends Component {

    state = {
        view: 'results'
    }


    render() {
        const {
            props: { title }, state: {view}} = this

        return <main className='app'>
            <h1>{title}</h1>

            {view ==='register' && <Register onSubmit={console.log('submit')} onToLogin={console.log('login')} error={undefined}/>}
            {view === 'results' && <Results results={console.log('results')} onItemClick={console.log('item')} onItemFavClick={console.log('fav')}/>}
          
        </main>
    }
}

