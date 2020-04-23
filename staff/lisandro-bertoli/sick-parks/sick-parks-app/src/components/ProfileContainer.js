import React, { useEffect, useState, useContext } from 'react'
import { retrievePublishedParks, retrieveUser, isUserLoggedIn, updateUser } from 'sick-parks-logic'
import Profile from './Profile'
import Loading from './Loading'
import { AuthContext } from './AuthProvider'
import { __handleErrors__ } from '../handlers'
import { Alert } from 'react-native'



export default function PorfileContainer() {
    const { logout } = useContext(AuthContext)
    const [error, setError] = useState(null)
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

    const handleUpdateUser = async (updates) => {
        try {
            await updateUser(user.id, updates)

            const updated = await retrieveUser()

            Alert.alert('Update succesful')

            setUser(updated)
        } catch ({ message }) {
            __handleErrors__(message, setError)
        }
    }

    if (!user) return <Loading />

    return <Profile user={user} error={error} userParks={publishedParks} onUpdateUser={handleUpdateUser} onLogout={handleLogout} />
}

