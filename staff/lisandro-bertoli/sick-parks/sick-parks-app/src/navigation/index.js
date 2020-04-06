// TODO auth context so we can route to one stack or the other
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './stacks/Auth'
import UserNavigation from './UserNav'


export default ({ isLogged }) => (
    <NavigationContainer>

        {isLogged
            ? (<UserNavigation />)
            : (<AuthNavigation />)
            //<NotUserNavigation/> ????
        }
    </NavigationContainer>
)

