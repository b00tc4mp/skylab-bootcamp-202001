import React, { useState } from 'react'

const Context = React.createContext()

function Provider({ children }) {
    const [token, setToken] = useState()
    const [users, setUsers] = useState([])

    const state = { token, setToken, users, setUsers }

    return (
        <Context.Provider value={state} >
            {children}
        </Context.Provider>
    )
}

export { Context, Provider }