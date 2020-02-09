const { Component } = React

class App extends Component {

    state = {
        view: undefined
    }


    render() {
        const {
            props: { title }} = this

        return <main>
            <h1>{title}</h1>
           

        </main>
    }
}

