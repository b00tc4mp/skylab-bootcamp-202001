import React, { useState, useEffect, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './stacks/Auth'
import UserNavigation from './UserNav'
import AnonymousNavigation from './AnonymousNav'
import { AuthContext } from '../components/AuthProvider'

export default () => {
    const [loading, setLoading] = useState(true)
    const { isUserLogged, isUserAnonymous, isUser, isAnonymous } = useContext(AuthContext)

    useEffect(() => {
        (async () => {
            try {
                await isUserLogged()
                await isUserAnonymous()

                setLoading(false)
            } catch (error) {
                console.log(error)
            }

        })()

    }, [isUser, isAnonymous])

    if (loading) return <Loading />

    return (

        <NavigationContainer>

            {!isUser && !isAnonymous && <AuthNavigation />}
            {isAnonymous && <AnonymousNavigation />}
            {isUser && <UserNavigation />}

        </NavigationContainer>
    )
}



