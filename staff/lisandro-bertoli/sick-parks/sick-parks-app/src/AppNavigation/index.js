// TODO auth context so we can route to one stack or the other
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './Auth'

export default () => (
    <NavigationContainer>
        <AuthNavigation />
    </NavigationContainer>
)

    // <Stack.Navigator>
    //     {auth.isLoggedIn
    //         ? <LoggedNavigation/>
    //         : <NotLoggedNavigation/>
    // </Stack.Navigator>
