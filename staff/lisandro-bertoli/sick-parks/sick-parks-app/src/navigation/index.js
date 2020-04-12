import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, View } from 'react-native'
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

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (

        <NavigationContainer>

            {!isUser && !isAnonymous && <AuthNavigation />}
            {isAnonymous && <AnonymousNavigation />}
            {isUser && <UserNavigation />}

        </NavigationContainer>
    )
}



