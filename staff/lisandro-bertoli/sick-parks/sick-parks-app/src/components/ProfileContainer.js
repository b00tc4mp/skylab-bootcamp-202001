import React, { useEffect, useState, useContext } from 'react'
import { retrievePublishedParks, retrieveUser, isUserLoggedIn } from 'sick-parks-logic'
import Profile from './Profile'
import Loading from './Loading'
import { AuthContext } from './AuthProvider'



export default function PorfileContainer() {
    const { logout } = useContext(AuthContext)
    const [publishedParks, setPublishedParks] = useState([])
    const [user, setUser] = useState()

    useEffect(() => {
        (async () => {
            try {

                if (isUserLoggedIn()) {
                    const _user = await retrieveUser()
                    const parks = await retrievePublishedParks()

                    setUser(_user)
                    setPublishedParks(parks)
                }


            } catch (error) {
                await logout()
                console.log(error)
            }
        })()
    }, [])

    const handleLogout = async () => await logout()

    const handleOnToLogin = () => { }

    if (!user) return <Loading />

    return <Profile user={user} userParks={publishedParks} onToLogin={handleOnToLogin} onLogout={handleLogout} />
}

