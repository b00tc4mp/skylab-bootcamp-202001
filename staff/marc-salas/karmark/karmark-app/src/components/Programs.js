import React, { useState, useEffect, useContext } from 'react'
import { retrievePrograms, play } from '../logic'
import { withRouter } from 'react-router-dom'
import { Context } from './ContextProvider'
import Items from './Items'

export default withRouter(function ({ history }) {
    const [, setState] = useContext(Context)
    const [programs, setPrograms] = useState()

    useEffect(() => {
        if (isLoggedIn())
            (async () => {
                try {
                    const programs = await retrievePrograms()

                    setPrograms(programs)

                    setState({ page: 'programs' })
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
            history.push('/programe')
            setState({ page: 'programe', error: message })
          }
    }

    return <>
        <div class="divmenu">
            <div class="menu">
                <div class="menuheader">
                    <h1>Name programs</h1>
                    <button><i class="fas fa-undo-alt"></i></button>
                </div>
                <div class="menubody">
                    <ul class="menubody__itme">
                        {programs.map(item => <Item key={item.id} name={programs.name} code={programs.code} play={handlePlay}/>)}
                    </ul>
                </div>
            </div>
        </div>
    </>
})