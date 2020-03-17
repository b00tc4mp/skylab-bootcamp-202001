import React, { useState, useEffect, useContext } from 'react'
import { retrieveUser, isLoggedIn, logeOut } from '../logic'
import './home.sass'
import { withRouter } from 'react-router-dom'
import {Context} from './ContextProvider'

export default withRouter(function ({ history }) {
    const [, setState] = useContext(Context)
    const [name, setName] = useState()

    useEffect(() => {
        if (isLoggedIn())
            (async () => {
                try {
                    const { name } = await retrieveUser()

                    setName(name)

                    setState({ page: 'home' })
                } catch ({ message }) {
                    setState({ error: message, page: 'login' })

                }
            })()
        else setState({ page: 'login' })
    })

    function handleLogeOut() {
        logeOut()

        setState({ page: 'login' })

        history.push('/login')
    }

    function handleOnToControl(){
        setState({ page: 'control' })

        history.push('/control')
    }

    return <>
        <div className="home">
            <header className="homeheader">
                <h1 className="homeheader__user"> Hello {name}</h1>
                <button className="homeheader__button" onClick={handleLogeOut}><i className="fas fa-lock"></i></button>
            </header>
            <main className="homemenu">
                <button className="homemenu__programe" >PROGRAME</button>
                <button className="homemenu__control" onClick={handleOnToControl}>CONTROL</button>
            </main>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
    integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous"/>
        </div>
    </>
})