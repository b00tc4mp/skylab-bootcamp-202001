const { Component } = React

class App extends Component {

    state = {
        view: undefined
    }


    render() {
        const {
            props: { title }, state: {view}} = this

        return <main className="app">
            {view!=='login' && view!=='register' && <Navbar 
            onLogout={()=>console.log('logout')} 
            onToSearch={(type)=>{console.log(type)}} 
            onToFavs={()=>console.log('onToFavs')} 
            onToProfile={()=>{console.log('profile')}}/>}

            <h1>{title}</h1>
            
            {view==="register" && <Register onSubmit={console.log('submit')} onToLogin={console.log('login')} error={undefined}/>}

           

        </main>
    }
}

