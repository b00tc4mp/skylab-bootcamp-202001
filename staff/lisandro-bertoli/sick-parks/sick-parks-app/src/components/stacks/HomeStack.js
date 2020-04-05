import React from 'react'
import { SearchContainer, ResultsContainer, ParkDetailsContainer } from '../containers'
import { createStackNavigator } from "@react-navigation/stack"

const HomeStack = createStackNavigator()

const options = {
    headerBackTitleVisible: false,
    headerStyle: { backgroundColor: '#82A4B3' },
    headerTitleStyle: { fontFamily: 'montserrat-semi' },
    headerTintColor: '#EFEBDA'
}

export default () => (
    <HomeStack.Navigator mode='modal' headerMode='screen' initialRouteName='Search' screenOptions={options}>

        <HomeStack.Screen name="Search" options={{ headerShown: false }} component={SearchContainer} />
        <HomeStack.Screen name="Results" component={ResultsContainer} options={{ headerTitle: TopSearchHeader }} />
        <HomeStack.Screen name="ParkDetails" component={ParkDetailsContainer} />

    </HomeStack.Navigator >

)