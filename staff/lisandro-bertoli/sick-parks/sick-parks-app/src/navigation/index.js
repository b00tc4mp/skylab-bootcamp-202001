// TODO auth context so we can route to one stack or the other
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './stacks/Auth'
import UserNavigation from './UserNav'

export default ({ isUser, isAnonymous }) => (

    <NavigationContainer>

        {!isUser && !isAnonymous && <AuthNavigation />}
        {isAnonymous && <NotUserNavigation />}
        {isUser && <UserNavigation />}

    </NavigationContainer>
)

