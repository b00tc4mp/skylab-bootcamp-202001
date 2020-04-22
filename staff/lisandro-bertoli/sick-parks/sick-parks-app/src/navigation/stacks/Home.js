import React from 'react'
import { SearchContainer, ResultsContainer, ParkDetailsContainer } from '../../components'
import { colors, fonts } from '../../constants'
import { createStackNavigator } from "@react-navigation/stack"

const HomeStack = createStackNavigator()

const options = {
    headerBackTitleVisible: false,
    headerStyle: { backgroundColor: colors.MAIN },
    headerTitleStyle: { fontFamily: fonts.SEMI },
    headerTintColor: colors.SECONDARY
}


export default () => (
    <HomeStack.Navigator mode='modal' headerMode='screen' initialRouteName='Search' screenOptions={options}>

        <HomeStack.Screen name="Search" options={{ headerShown: false }} component={SearchContainer} />
        <HomeStack.Screen name="Results" component={ResultsContainer} />
        <HomeStack.Screen name="ParkDetails" options={{ title: 'Park' }} component={ParkDetailsContainer} />

    </HomeStack.Navigator >

)