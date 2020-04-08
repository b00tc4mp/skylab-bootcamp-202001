import React, { useEffect, useState } from 'react'
import { retrievePublishedParks, retrieveUser, isUserLoggedIn, logoutUser } from 'sick-parks-logic'
import Profile from '../presentational/Profile'
import { View, Text } from 'react-native'



export default function PorfileContainer() {
    const [publishedParks, setPublishedParks] = useState([])
    const [user, setUser] = useState()

    useEffect(() => {
        (async () => {

            const _user = await retrieveUser()
            setUser(_user)

            if (isUserLoggedIn()) {
                try {
                    const parks = await retrievePublishedParks()

                    setPublishedParks(parks)

                } catch (error) {
                    console.log(error)
                }
            }
        })()


    }, [])

    const handleLogout = async () => await logoutUser()

    const handleOnToLogin = () => { }

    if (!user) return (<>
        <View>
            <Text>
                Loading...
             </Text>
        </View>

    </>)

    return <Profile user={user} userParks={publishedParks} onToLogin={handleOnToLogin} onLogout={handleLogout} />
}

