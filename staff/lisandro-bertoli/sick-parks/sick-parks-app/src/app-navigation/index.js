// TODO auth context so we can route to one stack or the other
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from '../components/stacks/AuthStack'


export default () => (
    <NavigationContainer>
        {!auth.loggedIn ? (

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
