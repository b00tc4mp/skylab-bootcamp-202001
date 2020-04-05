import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeContainer, BuilderContainer, ProfileContainer } from '../containers'

const Tabs = createBottomTabNavigator()


export default () => (
    <Tabs.Navigator>
        <Tabs.Screen name="Home" component={HomeContainer} />
        {/* <Tabs.Screen name="Map" component={MapViewContainer} initialParams={{ style: styles.mapStyle }} /> */}
        <Tabs.Screen name="Build" component={BuilderContainer} />
        <Tabs.Screen name="Profile" component={ProfileContainer} />
    </Tabs.Navigator>

)


