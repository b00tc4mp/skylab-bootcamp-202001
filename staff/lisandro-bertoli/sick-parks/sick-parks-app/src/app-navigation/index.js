// TODO auth context so we can route to one stack or the other
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from '../components/stacks/AuthStack'
import LoggedNavigation from './logged-navigation'

let user = true

export default () => (
    <NavigationContainer>
        {!user ? (

            <AuthNavigation />
            //<NotLoggedNavigation/>
        ) : (
                <LoggedNavigation />
            )
        }
    </NavigationContainer>
)

    // <Stack.Navigator>
    //     {auth.isLoggedIn
    //         ? <LoggedNavigation/>
    //         : <NotLoggedNavigation/>
    // </Stack.Navigator>
