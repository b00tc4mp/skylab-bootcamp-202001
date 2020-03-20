import React, { useState, useEffect, useContext } from 'react'
import { retrievePrograms, retrieveUser, play, isLoggedIn, logeOut  } from '../logic'
import { withRouter } from 'react-router-dom'
import { Context } from './ContextProvider'
import Items from './Items'
import './programs.sass'

export default withRouter(function ({ history }) {
    const [state, setState] = useContext(Context)
    const [programs, setPrograms] = useState()
    const [name, setName] = useState()
    useEffect(() => {
        if (isLoggedIn())
            (async () => {
                try {
                    const programs = await retrievePrograms()

                    const {name} = await retrieveUser()

                    setName(name)

                    setPrograms(programs)

                    setState({ page: 'programs' })

                    history.push('/programs')
                } catch ({ message }) {
                    logeOut()

                    setState({ page: 'login' })

                    history.push('/login')

                }
            })()
        else {
            setState({ page: 'login' })

            history.push('/login')
        }
    }, [])

    async function handlePlay(code) {
        try {
            await play(code)
      
          } catch ({message}) {
            history.push('/programs')
            setState({ page: 'programs', error: message })
          }
    }

    function handleOnPrograme(event){
        event.preventDefault()
        
        setState({ page: 'programe' })

        history.push('/programe')
    }
    return <>
            <div className="menu">
                <div className="menuheader">
                    <h1 className="menuheader__name">{name} programs</h1>
                    <button className="menuheader__button" onClick={handleOnPrograme}><i class="fas fa-backspace"></i></button>
                </div>
                <div className="menubody">
                    <div className="menubody__itme">
                        {programs && programs.map(item => <Items key={item.id} name={item.name} code={item.code} play={handlePlay}/>)}
                    </div>
                </div>
            </div>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
    integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous"/>
    </>
})