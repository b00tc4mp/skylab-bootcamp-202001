import React from 'react'
import { SearchContainer, ResultsContainer, ParkDetailsContainer } from '../../components'
import { COLORS, FONTS } from '../../constants'
import { createStackNavigator } from "@react-navigation/stack"

const HomeStack = createStackNavigator()

const options = {
    headerBackTitleVisible: false,
    headerStyle: { backgroundColor: COLORS.main },
    headerTitleStyle: { fontFamily: FONTS.semiBold },
    headerTintColor: COLORS.secondary
}


export default () => (
    <HomeStack.Navigator mode='modal' headerMode='screen' initialRouteName='Search' screenOptions={options}>

        <HomeStack.Screen name="Search" options={{ headerShown: false }} component={SearchContainer} />
        <HomeStack.Screen name="Results" component={ResultsContainer} />
        <HomeStack.Screen name="ParkDetails" component={ParkDetailsContainer} />

    </HomeStack.Navigator >

)