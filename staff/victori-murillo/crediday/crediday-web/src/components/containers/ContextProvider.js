import React, { useState, useEffect } from 'react'
import { retrieveUser } from '../../logic'
const Context = React.createContext()

function Provider({ children }) {
    const [token, setToken] = useState(sessionStorage.session)
    const [users, setUsers] = useState([])
    const [loggedUser, setLoggedUser] = useState()

    useEffect(() => {
        if (!loggedUser && token) {
            retrieveUser(token).then(({ user }) => setLoggedUser(user))
        }
    }, [token])

    const state = { token, setToken, users, setUsers, loggedUser }

    return (
        <Context.Provider value={state} >
            {children}
        </Context.Provider>
    )
}

export { Context, Provider }