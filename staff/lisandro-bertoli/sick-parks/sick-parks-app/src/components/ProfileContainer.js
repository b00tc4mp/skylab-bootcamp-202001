import React, { useEffect, useState, useContext } from 'react'
import { retrievePublishedParks, retrieveUser } from 'sick-parks-logic'
import Profile from './Profile'
import Loading from './Loading'
import { View, ActivityIndicator } from 'react-native'
import { AuthContext } from './AuthProvider'



export default function PorfileContainer() {
    const { logout } = useContext(AuthContext)
    const [publishedParks, setPublishedParks] = useState([])
    const [user, setUser] = useState()

    useEffect(() => {
        (async () => {
            try {
                const _user = await retrieveUser()
                const parks = await retrievePublishedParks()

                setUser(_user)
                setPublishedParks(parks)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const handleLogout = async () => await logout()

    const handleOnToLogin = () => { }

    if (!user) return <Loading />

    return <Profile user={user} userParks={publishedParks} onToLogin={handleOnToLogin} onLogout={handleLogout} />
}

