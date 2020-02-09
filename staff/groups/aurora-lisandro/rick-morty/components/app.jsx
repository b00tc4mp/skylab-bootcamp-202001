const { Component } = React

class App extends Component {

    state = {
        view: 'register'
    }


    render() {
        const {
            props: { title }, state: {view}} = this

        return <main className="app">
            <h1>{title}</h1>

            {view==="register" && <Register onSubmit={console.log('submit')} onToLogin={console.log('login')} error={undefined}/>}
           

        </main>
    }
}

